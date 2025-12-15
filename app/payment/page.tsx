'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Script from 'next/script'

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface OrderItem {
  slug: string;
  title: string;
  price: number;
  price_display: string;
  category?: string;
  icon?: string;
  timeline?: string;
  id?: string; // Optional, might be added later
}

interface PendingOrder {
  items: OrderItem[];
  total: number;
  userEmail: string;
  userName: string;
  orderDate: string;
}

export default function Payment() {
  const router = useRouter()
  const [orderData, setOrderData] = useState<PendingOrder | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0) // 0 = Not started, 1...N = Item index + 1
  const [statusMessage, setStatusMessage] = useState('')
  const [token, setToken] = useState<string | null>(null)

  // Ref to keep track of current item index during callbacks without closure staleness
  const processingIndexRef = useRef(0);
  const processedItemsRef = useRef<any[]>([]);

  useEffect(() => {
    setMounted(true)

    if (typeof window !== 'undefined') {
      // 1. Check Login
      let storedToken = localStorage.getItem('accessToken') || localStorage.getItem('token');
      const legacyToken = localStorage.getItem('authToken');

      // Auto-migrate legacy token if found
      if (!storedToken && legacyToken) {
        storedToken = legacyToken;
        localStorage.setItem('accessToken', legacyToken);
        localStorage.removeItem('authToken'); // Clean up
      }

      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

      if (!isLoggedIn || !storedToken) {
        localStorage.setItem('redirectAfterLogin', '/payment')
        router.push('/login')
        return
      }
      setToken(storedToken)

      // 2. Check Pending Order
      const pending = localStorage.getItem('pendingOrder')
      if (!pending) {
        router.push('/checkout')
        return
      }
      try {
        const parsedData = JSON.parse(pending)
        setOrderData(parsedData)
      } catch (error) {
        console.error('Error loading order:', error)
        router.push('/checkout')
      }
    }
  }, [router])

  const processPaymentForItem = async (index: number) => {
    if (!orderData || !token) return;

    const item = orderData.items[index];
    setStatusMessage(`Processing item ${index + 1} of ${orderData.items.length}: ${item.title}...`);
    setIsProcessing(true);
    setCurrentStep(index + 1);

    try {
      // --- Step 1: Extract Service Plan ID ---
      // Expected slug format: "service-X-plan-Y"
      const match = item.slug.match(/plan-(\d+)/);
      if (!match) {
        throw new Error(`Invalid item format: ${item.slug}. Cannot identify Service Plan.`);
      }
      const planId = parseInt(match[1]);

      // --- Step 2: Create Case ---
      setStatusMessage(`Creating case for ${item.title}...`);
      const createCaseRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cases/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ service_plan: planId })
      });

      if (!createCaseRes.ok) {
        if (createCaseRes.status === 401) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('authToken');
          localStorage.setItem('redirectAfterLogin', '/payment');
          router.push('/login');
          throw new Error("Session expired. Please log in again.");
        }
        const err = await createCaseRes.json();
        throw new Error(err.detail || 'Failed to create case');
      }
      const caseData = await createCaseRes.json();
      const caseId = caseData.id;

      // --- Step 3: Create Razorpay Order ---
      setStatusMessage(`Initializing payment for ${item.title}...`);
      const createOrderRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cases/${caseId}/razorpay/create-order/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!createOrderRes.ok) {
        const err = await createOrderRes.json();
        throw new Error(err.detail || 'Failed to initialize payment gateway');
      }
      const orderDetails = await createOrderRes.json();

      // --- Step 4: Open Razorpay Modal ---
      const options = {
        key: orderDetails.key_id, // Enter the Key ID generated from the Dashboard
        amount: orderDetails.amount, // Amount is in currency subunits. Default currency is INR.
        currency: orderDetails.currency,
        name: "FinovaTaxPro",
        description: `Payment for Case #${caseId} - ${item.title}`,
        image: "/logo.png", // Ensure you have a logo or remove this
        order_id: orderDetails.order_id,
        handler: async function (response: any) {
          // --- Step 5: Verify Payment ---
          try {
            setStatusMessage(`Verifying payment for ${item.title}...`);
            const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cases/${caseId}/razorpay/verify/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            if (!verifyRes.ok) {
              throw new Error('Payment verification failed');
            }

            // Initial verification success only implies THIS item is done.
            // We track it and move to next.
            processedItemsRef.current.push({
              ...item,
              caseId: caseId,
              paymentId: response.razorpay_payment_id,
              status: 'Paid'
            });

            handleNextItem();

          } catch (err: any) {
            console.error("Verification Error", err);
            alert(`Payment verification failed: ${err.message}`);
            setIsProcessing(false);
          }
        },
        prefill: {
          name: orderData.userName,
          email: orderData.userEmail,
          contact: ""
        },
        notes: {
          case_id: caseId
        },
        theme: {
          color: "#2563EB"
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            alert('Payment cancelled. You can try again.');
          }
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        alert(`Payment Failed: ${response.error.description}`);
        setIsProcessing(false);
      });
      rzp1.open();

    } catch (error: any) {
      console.error("Payment Process Error", error);
      alert(`Error exploring service: ${error.message}`);
      setIsProcessing(false);
    }
  };

  const handleNextItem = () => {
    const nextIndex = processingIndexRef.current + 1;
    if (orderData && nextIndex < orderData.items.length) {
      processingIndexRef.current = nextIndex;
      processPaymentForItem(nextIndex);
    } else {
      // --- ALL ITEMS PROCESSED ---
      completeOrder();
    }
  };

  const completeOrder = () => {
    setStatusMessage('All payments successful! Finalizing...');

    // Save the completed order details for the success page
    const completedOrder = {
      ...orderData,
      orderId: `FTP-${Date.now()}`, // Generate a comprehensive ID
      items: processedItemsRef.current, // Use the items we actually processed with case IDs
      completedAt: new Date().toISOString()
    };

    localStorage.setItem('completedOrder', JSON.stringify(completedOrder));

    // Clear cart
    localStorage.removeItem('cartItems');
    localStorage.removeItem('pendingOrder');
    window.dispatchEvent(new Event('cartUpdated'));

    router.push('/order-success');
  };

  const startPayment = () => {
    // Reset refs
    processingIndexRef.current = 0;
    processedItemsRef.current = [];
    processPaymentForItem(0);
  };

  // Loading State
  if (!mounted || !orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4">

          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/checkout')}
              className="flex items-center text-blue-600 hover:text-blue-700 mb-4 font-medium transition"
              disabled={isProcessing}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Cart
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Payment</h1>
            <p className="text-gray-600">Securely pay for your services</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Main Section */}
            <div className="lg:col-span-2 space-y-6">

              {/* Payment Info */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
                  <div className="flex gap-2">
                    <span className="text-2xl">💳</span>
                    <span className="text-2xl">🏦</span>
                    <span className="text-2xl">📱</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-blue-800 mb-2">Information</h3>
                  <p className="text-sm text-blue-600">
                    You are ensuring compliance for <strong>{orderData.items.length} service(s)</strong>.
                    You will be prompted to complete payment for each service individually to ensure separate case tracking.
                  </p>
                </div>

                {isProcessing && (
                  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center animate-pulse">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600 mr-3"></div>
                    <span className="text-yellow-800 font-medium">{statusMessage}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {orderData.items.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-4 border rounded-lg transition-colors ${index < currentStep - 1 ? 'bg-green-50 border-green-200' :
                        index === currentStep - 1 && isProcessing ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-300' :
                          'bg-gray-50 border-gray-200 opacity-70'
                        }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold text-white transition-colors ${index < currentStep - 1 ? 'bg-green-500' :
                        index === currentStep - 1 && isProcessing ? 'bg-blue-600' :
                          'bg-gray-400'
                        }`}>
                        {index < currentStep - 1 ? '✓' : index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.price_display}</p>
                      </div>
                      {index < currentStep - 1 && (
                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">PAID</span>
                      )}
                    </div>
                  ))}
                </div>

              </div>

              {/* Security Trust */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center">
                  <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">256-bit SSL Secured</p>
                    <p className="text-sm text-gray-500">Your payment is safe with us</p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-60">
                  {/* Placeholder logos */}
                  <div className="h-8 w-12 bg-gray-300 rounded"></div>
                  <div className="h-8 w-12 bg-gray-300 rounded"></div>
                  <div className="h-8 w-12 bg-gray-300 rounded"></div>
                </div>
              </div>

            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4 pb-4 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Items</span>
                    <span className="font-medium text-gray-900">{orderData.items.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹{orderData.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total Amount</span>
                  <span className="text-blue-600">₹{orderData.total.toLocaleString()}</span>
                </div>

                <button
                  onClick={startPayment}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:bg-blue-300 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isProcessing ? 'Processing Payments...' : `Pay ₹${orderData.total.toLocaleString()}`}
                </button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  By clicking Pay, you agree to our Terms of Service and Refund Policy.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}