'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import useSWR from 'swr'

// Fetcher function for useSWR
const fetcher = async (url: string) => {
  if (typeof window === 'undefined') return null; // Guard for server-side
  const token = localStorage.getItem('accessToken');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // @ts-ignore
    error.info = await res.json();
    // @ts-ignore
    error.status = res.status;
    throw error;
  }
  return res.json();
};

// Type definitions
interface CartItem {
  slug: string
  title: string
  category: string
  short: string
  icon: string
  timeline: string
  price: number
  price_display: string
}

interface TrackingUpdate {
  date: string
  message: string
}

interface Order {
  id: string
  serviceName: string
  status: string
  orderDate: string
  estimatedCompletion: string
  total: number
  progress: number
  trackingUpdates?: TrackingUpdate[]
}

interface Document {
  id: string
  name: string
  type: string
  uploadDate: string
  size: string
  orderId: string
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isClient, setIsClient] = useState(false)
  
  // Initialize client-side flag
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Fetch User Profile
  const { data: user, error: userError } = useSWR(
    isClient ? `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile/` : null,
    fetcher
  );

  // Fetch Cases (Orders)
  const { data: cases, error: casesError } = useSWR(
    isClient ? `${process.env.NEXT_PUBLIC_API_URL}/api/services/cases/` : null,
    fetcher
  );

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  
  // Derived state from API data
  const [activeOrders, setActiveOrders] = useState<Order[]>([])
  const [completedOrders, setCompletedOrders] = useState<Order[]>([])
  const [documents, setDocuments] = useState<Document[]>([]) // API for docs?

  // Auth Check Effect
  useEffect(() => {
    if (!isClient) return;
    
    // Check if user should be redirected (e.g. 401)
    if (userError && userError.status === 401) {
       window.location.href = '/login';
    }
  }, [userError, isClient]);

  // Load Cart from LocalStorage
  useEffect(() => {
    if (!isClient) return;
    try {
      const items = localStorage.getItem('cartItems')
      if (items) {
        setCartItems(JSON.parse(items))
      }
    } catch (error) {
      console.error('Error loading cart items:', error)
    }
  }, [isClient]);

  // Sync API Cases to UI Orders
  useEffect(() => {
    if (cases && Array.isArray(cases)) {
      const mappedOrders: Order[] = cases.map((c: any) => ({
        id: c.id.toString(),
        serviceName: c.service_plan?.service?.name || 'Service Request',
        status: c.status ? c.status.charAt(0).toUpperCase() + c.status.slice(1).toLowerCase().replace('_', ' ') : 'Pending',
        orderDate: new Date(c.created_at).toLocaleDateString(),
        estimatedCompletion: 'TBD', // API doesn't seem to have this yet
        total: 0, // API doesn't seem to have price on list
        progress: c.status === 'COMPLETED' ? 100 : (c.status === 'IN_PROGRESS' ? 50 : 10),
        trackingUpdates: [] // API doesn't have updates yet
      }));

      setActiveOrders(mappedOrders.filter(o => o.status !== 'Completed'));
      setCompletedOrders(mappedOrders.filter(o => o.status === 'Completed'));
    }
  }, [cases]);


  const removeFromCart = (slug: string) => {
    const updated = cartItems.filter(item => item.slug !== slug)
    setCartItems(updated)
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(updated))
      window.dispatchEvent(new Event('storage'))
      window.dispatchEvent(new Event('cartUpdated'))
    }
  }

  const calculateCartTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price, 0)
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userName')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('accessToken')
    }
    window.location.href = '/'
  }

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if(s.includes('progress')) return 'bg-blue-100 text-blue-800';
    if(s.includes('review')) return 'bg-yellow-100 text-yellow-800';
    if(s.includes('completed')) return 'bg-green-100 text-green-800';
    if(s.includes('pending')) return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  }

  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'bg-red-500'
    if (progress < 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getDocumentIcon = (type: string) => {
    // Keep existing icon logic
     return (
          <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )
  }

  // Loading State
  if (!isClient) {
     return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }
  
  if (!user && !userError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user data...</p>
        </div>
      </div>
    )
  }
  
  // Use API user data or fallback to local storage (though API is preferred)
  const userName = user?.first_name ? `${user.first_name} ${user.last_name || ''}` : (typeof window !== 'undefined' ? localStorage.getItem('userName') : 'User') || 'User';
  const userEmail = user?.email || (typeof window !== 'undefined' ? localStorage.getItem('userEmail') : '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              FinovaTaxPro
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                Home
              </Link>
              <Link href="/#services" className="text-gray-700 hover:text-blue-600 transition">
                Services
              </Link>
              <Link href="/user_dashboard" className="text-blue-600 font-semibold">
                Dashboard
              </Link>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">{userName}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-red-600 hover:text-red-700 transition px-4 py-2 rounded-lg hover:bg-red-50"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>

            {/* Mobile menu button could go here */}
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {userName.split(' ')[0]}! 👋</h1>
              <p className="text-blue-100">Track your services, manage your cart, and view your order history</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Cart Items</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{cartItems.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Orders</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{activeOrders.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{completedOrders.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap space-x-4 md:space-x-8 px-6" aria-label="Tabs">
              {['overview', 'cart', 'active', 'history', 'documents'].map(tab => (
                 <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition whitespace-nowrap capitalize ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                  {activeOrders.length > 0 ? (
                    <div className="space-y-3">
                      {activeOrders.slice(0, 2).map((order) => (
                        <div key={order.id} className="bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{order.serviceName}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <span className="mr-2">Order Date: {order.orderDate}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(order.progress)}`}
                              style={{ width: `${order.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">No recent activity</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Cart Tab (Keep as is, mostly) */}
            {activeTab === 'cart' && (
              <div>
                {cartItems.length === 0 ? (
                  <div className="text-center py-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                    <Link
                      href="/#services"
                      className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                      Browse Services
                    </Link>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div key={item.slug} className="border rounded-xl p-5 hover:shadow-md transition bg-white">
                           <div className="flex justify-between">
                              <h3>{item.title}</h3>
                              <button onClick={() => removeFromCart(item.slug)} className="text-red-500">Remove</button>
                           </div>
                           <p>₹{item.price}</p>
                        </div>
                      ))}
                    </div>
                     <Link
                        href="/checkout"
                        className="w-full block text-center bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg transition shadow-lg hover:shadow-xl"
                      >
                        Proceed to Checkout
                      </Link>
                  </div>
                )}
              </div>
            )}

            {/* Active Orders Tab */}
            {activeTab === 'active' && (
              <div>
                {activeOrders.length === 0 ? (
                  <div className="text-center py-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No active orders</h3>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {activeOrders.map((order) => (
                      <div key={order.id} className="border rounded-xl p-6 hover:shadow-lg transition bg-white">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{order.serviceName}</h3>
                            <p className="text-sm text-gray-500 mt-1">Order ID: #{order.id}</p>
                          </div>
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                         <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-600">Project Progress</span>
                            <span className="text-sm font-bold text-blue-600">{order.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div 
                              className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(order.progress)}`}
                              style={{ width: `${order.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

             {/* History Tab */}
            {activeTab === 'history' && (
              <div>
                 {completedOrders.length === 0 ? (
                  <div className="text-center py-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No order history</h3>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {completedOrders.map((order) => (
                      <div key={order.id} className="border rounded-xl p-5 hover:shadow-md transition bg-white">
                         <h3 className="text-lg font-bold text-gray-900">{order.serviceName}</h3>
                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                {order.status}
                          </span>
                      </div>
                    ))}
                  </div>
                 )}
              </div>
            )}

             {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div>
                <div className="text-center py-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No documents yet</h3>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}