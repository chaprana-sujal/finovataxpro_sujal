'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface PendingOrder {
  items: any[]
  orders?: any[]
  subtotal: number
  gst: number
  total: number
  userEmail: string
  userName: string
  orderDate: string
}

export default function Payment() {
  const router = useRouter()
  const [orderData, setOrderData] = useState<PendingOrder | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  })
  const [upiId, setUpiId] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
      if (!isLoggedIn) {
        router.push('/login')
        return
      }

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

  const handlePayment = async () => {
    if (!orderData) return
    setIsProcessing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Create orders from items if orders array doesn't exist
      const ordersToProcess = orderData.orders && orderData.orders.length > 0 
        ? orderData.orders 
        : orderData.items.map(item => ({
            id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            serviceId: item.id,
            serviceTitle: item.title,
            serviceName: item.title,
            price: item.price,
            price_display: item.price_display,
            orderDate: orderData.orderDate,
            status: 'Pending',
            progress: 0
          }))

      const updatedOrders = ordersToProcess.map(order => ({
        ...order,
        status: 'In Progress',
        progress: 15,
        trackingUpdates: [
          {
            date: new Date().toLocaleDateString('en-GB'),
            message: 'Payment received successfully'
          },
          {
            date: new Date().toLocaleDateString('en-GB'),
            message: 'Order placed successfully'
          },
          {
            date: new Date().toLocaleDateString('en-GB'),
            message: 'Our team is reviewing your requirements'
          }
        ]
      }))

      const existingActive = localStorage.getItem('activeOrders')
      const activeOrders = existingActive ? JSON.parse(existingActive) : []
      localStorage.setItem('activeOrders', JSON.stringify([...activeOrders, ...updatedOrders]))

      localStorage.removeItem('cartItems')
      localStorage.removeItem('pendingOrder')

      window.dispatchEvent(new Event('cartUpdated'))

      router.push('/payment-success')
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  // Don't render until mounted to avoid hydration issues
  if (!mounted || !orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    )
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-4">Redirecting to order details...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/checkout')}
            suppressHydrationWarning
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4 font-medium transition"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Payment</h1>
          <p className="text-gray-600">Choose your preferred payment method</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Select Payment Method</h2>

              <div className="space-y-3">
                {/* Credit/Debit Card */}
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                  selectedPaymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={selectedPaymentMethod === 'card'}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    suppressHydrationWarning
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">Credit / Debit Card</span>
                      <div className="flex gap-2">
                        <span className="text-xl" suppressHydrationWarning>💳</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Visa, Mastercard, Rupay</p>
                  </div>
                </label>

                {/* UPI */}
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                  selectedPaymentMethod === 'upi' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={selectedPaymentMethod === 'upi'}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    suppressHydrationWarning
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">UPI</span>
                      <span className="text-xl" suppressHydrationWarning>📱</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Google Pay, PhonePe, Paytm, BHIM</p>
                  </div>
                </label>

                {/* Net Banking */}
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                  selectedPaymentMethod === 'netbanking' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={selectedPaymentMethod === 'netbanking'}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    suppressHydrationWarning
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">Net Banking</span>
                      <span className="text-xl" suppressHydrationWarning>🏦</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">All major banks supported</p>
                  </div>
                </label>

                {/* Wallets */}
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                  selectedPaymentMethod === 'wallet' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="wallet"
                    checked={selectedPaymentMethod === 'wallet'}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    suppressHydrationWarning
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">Wallets</span>
                      <span className="text-xl" suppressHydrationWarning>💰</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Paytm, PhonePe, Amazon Pay</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start">
                <svg className="w-8 h-8 text-green-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">100% Secure Payment</h3>
                  <p className="text-sm text-gray-600">Your payment information is encrypted with bank-level security. We never store your card details.</p>
                  <div className="flex gap-2 mt-3">
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-medium" suppressHydrationWarning>🔒 SSL Encrypted</span>
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-medium" suppressHydrationWarning>✓ PCI Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4 pb-4 border-b">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600 flex-1">{item.title}</span>
                    <span className="font-medium text-gray-900 ml-2">{item.price_display}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900" suppressHydrationWarning>₹{orderData.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total Amount</span>
                <span className="text-blue-600" suppressHydrationWarning>₹{orderData.total.toLocaleString()}</span>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                suppressHydrationWarning
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:bg-blue-300 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span suppressHydrationWarning>Pay ₹{orderData.total.toLocaleString()}</span>
                )}
              </button>

              <div className="mt-6 text-center">
                <div className="inline-flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Money-back guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}