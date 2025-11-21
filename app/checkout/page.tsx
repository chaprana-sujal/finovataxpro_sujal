'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Checkout() {
  const [cartItems, setCartItems] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Check login status only on client side
    if (!isClient) return

    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
      setIsLoggedIn(loggedIn)
      
      if (!loggedIn) {
        // Store the current page as redirect destination
        localStorage.setItem('redirectAfterLogin', '/checkout')
        window.location.href = '/login'
        return
      }
      
      setUserName(localStorage.getItem('userName') || '')
      setUserEmail(localStorage.getItem('userEmail') || '')
      
      // Load cart items
      const pendingService = localStorage.getItem('pendingService')
      const existingCart = localStorage.getItem('cartItems')
      
      let items = []
      if (existingCart) {
        items = JSON.parse(existingCart)
      }
      
      if (pendingService) {
        const service = JSON.parse(pendingService)
        const exists = items.some(item => item.slug === service.slug)
        if (!exists) {
          items.push(service)
        }
        localStorage.removeItem('pendingService')
        localStorage.setItem('cartItems', JSON.stringify(items))
        // Dispatch event to update header cart count
        window.dispatchEvent(new Event('storage'))
        window.dispatchEvent(new Event('cartUpdated'))
      }
      
      setCartItems(items)
    }
  }, [isClient])

  const removeItem = (slug) => {
    const updated = cartItems.filter(item => item.slug !== slug)
    setCartItems(updated)
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(updated))
      // Dispatch events to update header cart count
      window.dispatchEvent(new Event('storage'))
      window.dispatchEvent(new Event('cartUpdated'))
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price, 0)
  }

  const handleProceedToPayment = () => {
    // Store order details before going to payment
    const orderData = {
      items: cartItems,
      total: calculateTotal(),
      userEmail: userEmail,
      userName: userName,
      orderDate: new Date().toISOString()
    }
    localStorage.setItem('pendingOrder', JSON.stringify(orderData))
    
    // Redirect to payment page using window.location for proper navigation
    window.location.href = '/payment'
  }

  // Show loading state until client-side rendering
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-sm p-12">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any services yet. Browse our services to get started!
            </p>
            <Link
              href="/#services"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Review your services before payment</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.slug} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  {/* Service Icon */}
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    {item.icon}
                  </div>

                  {/* Service Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.slug)}
                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                        title="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.short}</p>
                    
                    {/* Service Details */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item.timeline}
                      </div>
                      <div className="flex items-center text-green-600 font-medium">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Expert Support
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-bold text-blue-600">{item.price_display}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              href="/#services"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Customer Info */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm text-gray-600">{userName}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-600">{userEmail}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Govt. Fees</span>
                  <span>As applicable</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              {/* Proceed to Payment Button */}
              <button
                onClick={handleProceedToPayment}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-4"
              >
                Proceed to Payment →
              </button>

              {/* Security Badges */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Secure Checkout</h4>
                    <p className="text-xs text-gray-600">Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 mb-2">We accept</p>
                <div className="flex justify-center gap-2">
                  <div className="px-3 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">💳 Cards</div>
                  <div className="px-3 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">🏦 UPI</div>
                  <div className="px-3 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">💰 Wallet</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">Our experts are available 24/7 to assist you</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:+919876543210" className="flex items-center px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition text-sm font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <Link href="/contact" className="flex items-center px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition text-sm font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}