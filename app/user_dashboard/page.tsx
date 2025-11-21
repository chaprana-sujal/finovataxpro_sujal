//app/user_dashboard/page.tsx
// 'use client'
// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'

// // Type definitions
// interface CartItem {
//   slug: string
//   title: string
//   category: string
//   short: string
//   icon: string
//   timeline: string
//   price: number
//   price_display: string
// }

// interface TrackingUpdate {
//   date: string
//   message: string
// }

// interface Order {
//   id: string
//   serviceName: string
//   status: string
//   orderDate: string
//   estimatedCompletion: string
//   total: number
//   progress: number
//   trackingUpdates?: TrackingUpdate[]
// }

// export default function Dashboard() {
//   const router = useRouter()
//   const [activeTab, setActiveTab] = useState('cart')
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [userName, setUserName] = useState('')
//   const [userEmail, setUserEmail] = useState('')
//   const [cartItems, setCartItems] = useState<CartItem[]>([])
//   const [activeOrders, setActiveOrders] = useState<Order[]>([])
//   const [completedOrders, setCompletedOrders] = useState<Order[]>([])
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [isClient, setIsClient] = useState(false)

//   // Initialize client-side flag
//   useEffect(() => {
//     setIsClient(true)
//   }, [])

//   useEffect(() => {
//     // Check authentication only on client
//     if (!isClient) return
    
//     if (typeof window !== 'undefined') {
//       const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
//       setIsLoggedIn(loggedIn)
      
//       if (!loggedIn) {
//         router.push('/login')
//         return
//       }
      
//       setUserName(localStorage.getItem('userName') || 'User')
//       setUserEmail(localStorage.getItem('userEmail') || '')
      
//       // Load data
//       loadCartItems()
//       loadOrders()
//     }
//   }, [router, isClient])

//   const loadCartItems = () => {
//     if (typeof window === 'undefined') return
//     try {
//       const items = localStorage.getItem('cartItems')
//       if (items) {
//         setCartItems(JSON.parse(items))
//       }
//     } catch (error) {
//       console.error('Error loading cart items:', error)
//     }
//   }

//   const loadOrders = () => {
//     if (typeof window === 'undefined') return
//     try {
//       // Load active orders
//       const active = localStorage.getItem('activeOrders')
//       if (active) {
//         setActiveOrders(JSON.parse(active))
//       }
      
//       // Load completed orders
//       const completed = localStorage.getItem('completedOrders')
//       if (completed) {
//         setCompletedOrders(JSON.parse(completed))
//       }
//     } catch (error) {
//       console.error('Error loading orders:', error)
//     }
//   }

//   const removeFromCart = (slug: string) => {
//     const updated = cartItems.filter(item => item.slug !== slug)
//     setCartItems(updated)
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('cartItems', JSON.stringify(updated))
//     }
//   }

//   const calculateCartTotal = () => {
//     return cartItems.reduce((sum, item) => sum + item.price, 0)
//   }

//   const handleLogout = () => {
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('isLoggedIn')
//       localStorage.removeItem('userName')
//       localStorage.removeItem('userEmail')
//     }
//     router.push('/')
//   }

//   const getStatusColor = (status: string) => {
//     switch(status) {
//       case 'In Progress': return 'bg-blue-100 text-blue-800'
//       case 'Under Review': return 'bg-yellow-100 text-yellow-800'
//       case 'Completed': return 'bg-green-100 text-green-800'
//       case 'Payment Pending': return 'bg-orange-100 text-orange-800'
//       default: return 'bg-gray-100 text-gray-800'
//     }
//   }

//   const getProgressColor = (progress: number) => {
//     if (progress < 30) return 'bg-red-500'
//     if (progress < 70) return 'bg-yellow-500'
//     return 'bg-green-500'
//   }

//   // Don't render until client-side to avoid hydration issues
//   if (!isClient) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header/Navigation */}
//       <nav className="bg-white shadow-md sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <Link href="/" className="text-2xl font-bold text-blue-600">
//               YourBrand
//             </Link>
            
//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center space-x-6">
//               <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
//                 Home
//               </Link>
//               <Link href="/#services" className="text-gray-700 hover:text-blue-600 transition">
//                 Services
//               </Link>
//               <Link href="/dashboard" className="text-blue-600 font-semibold">
//                 Dashboard
//               </Link>
//               <div className="flex items-center space-x-3">
//                 <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg">
//                   <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                   <span className="text-sm font-medium text-gray-700">{userName}</span>
//                 </div>
//                 <button 
//                   onClick={handleLogout}
//                   className="flex items-center text-red-600 hover:text-red-700 transition px-4 py-2 rounded-lg hover:bg-red-50"
//                 >
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                   </svg>
//                   Logout
//                 </button>
//               </div>
//             </div>

//             {/* Mobile menu button */}
//             <button 
//               className="md:hidden"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 {isMobileMenuOpen ? (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 ) : (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-white border-t">
//             <div className="px-4 py-3 space-y-3">
//               <Link href="/" className="block text-gray-700 py-2">Home</Link>
//               <Link href="/#services" className="block text-gray-700 py-2">Services</Link>
//               <Link href="/dashboard" className="block text-blue-600 font-semibold py-2">Dashboard</Link>
//               <div className="py-2 border-t">
//                 <p className="text-sm text-gray-600">{userName}</p>
//                 <p className="text-xs text-gray-500">{userEmail}</p>
//               </div>
//               <button 
//                 onClick={handleLogout}
//                 className="w-full text-left text-red-600 py-2"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Dashboard Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Banner */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
//           <h1 className="text-3xl font-bold mb-2">Welcome back, {userName.split(' ')[0]}! 👋</h1>
//           <p className="text-blue-100">Track your services, manage your cart, and view your order history</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Cart Items</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">{cartItems.length}</p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-lg">
//                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Active Orders</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">{activeOrders.length}</p>
//               </div>
//               <div className="bg-yellow-100 p-3 rounded-lg">
//                 <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Completed</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">{completedOrders.length}</p>
//               </div>
//               <div className="bg-green-100 p-3 rounded-lg">
//                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Total Spent</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">
//                   ₹{completedOrders.reduce((sum, order) => sum + (order.total || 0), 0).toLocaleString()}
//                 </p>
//               </div>
//               <div className="bg-purple-100 p-3 rounded-lg">
//                 <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs Navigation */}
//         <div className="bg-white rounded-xl shadow-sm mb-8">
//           <div className="border-b border-gray-200">
//             <nav className="flex space-x-8 px-6" aria-label="Tabs">
//               <button
//                 onClick={() => setActiveTab('cart')}
//                 className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
//                   activeTab === 'cart'
//                     ? 'border-blue-600 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//                 My Cart ({cartItems.length})
//               </button>
//               <button
//                 onClick={() => setActiveTab('active')}
//                 className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
//                   activeTab === 'active'
//                     ? 'border-blue-600 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 Active Orders
//               </button>
//               <button
//                 onClick={() => setActiveTab('history')}
//                 className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
//                   activeTab === 'history'
//                     ? 'border-blue-600 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 Order History
//               </button>
//             </nav>
//           </div>

//           {/* Tab Content */}
//           <div className="p-6">
//             {/* Cart Tab */}
//             {activeTab === 'cart' && (
//               <div>
//                 {cartItems.length === 0 ? (
//                   <div className="text-center py-16">
//                     <div className="text-6xl mb-4">🛒</div>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
//                     <p className="text-gray-600 mb-6">Browse our services and add them to your cart</p>
//                     <Link
//                       href="/#services"
//                       className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
//                     >
//                       Browse Services
//                     </Link>
//                   </div>
//                 ) : (
//                   <div>
//                     <div className="space-y-4 mb-6">
//                       {cartItems.map((item) => (
//                         <div key={item.slug} className="border rounded-xl p-5 hover:shadow-md transition bg-white">
//                           <div className="flex items-start gap-4">
//                             {/* Service Icon */}
//                             <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
//                               {item.icon}
//                             </div>

//                             {/* Service Details */}
//                             <div className="flex-1 min-w-0">
//                               <div className="flex items-start justify-between gap-4 mb-2">
//                                 <div>
//                                   <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
//                                   <p className="text-sm text-gray-500">{item.category}</p>
//                                 </div>
//                                 <button
//                                   onClick={() => removeFromCart(item.slug)}
//                                   className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
//                                   title="Remove from cart"
//                                 >
//                                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                                   </svg>
//                                 </button>
//                               </div>
//                               <p className="text-sm text-gray-600 mb-3">{item.short}</p>
                              
//                               <div className="flex flex-wrap gap-3 text-sm">
//                                 <div className="flex items-center text-gray-600">
//                                   <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                   </svg>
//                                   {item.timeline}
//                                 </div>
//                                 <div className="flex items-center text-green-600 font-medium">
//                                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                                   </svg>
//                                   Expert Support
//                                 </div>
//                               </div>
//                             </div>

//                             {/* Price */}
//                             <div className="text-right flex-shrink-0">
//                               <div className="text-2xl font-bold text-blue-600">{item.price_display}</div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Cart Summary */}
//                     <div className="border-t pt-6 bg-gray-50 rounded-xl p-6">
//                       <div className="flex justify-between items-center mb-4">
//                         <span className="text-lg font-semibold text-gray-700">Total Amount:</span>
//                         <span className="text-3xl font-bold text-blue-600">₹{calculateCartTotal().toLocaleString()}</span>
//                       </div>
//                       <Link
//                         href="/checkout"
//                         className="w-full block text-center bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg transition shadow-lg hover:shadow-xl"
//                       >
//                         Proceed to Checkout →
//                       </Link>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Active Orders Tab */}
//             {activeTab === 'active' && (
//               <div>
//                 {activeOrders.length === 0 ? (
//                   <div className="text-center py-16">
//                     <div className="text-6xl mb-4">📦</div>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-2">No active orders</h3>
//                     <p className="text-gray-600 mb-6">Your active service orders will appear here</p>
//                     <Link
//                       href="/#services"
//                       className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
//                     >
//                       Browse Services
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="space-y-6">
//                     {activeOrders.map((order) => (
//                       <div key={order.id} className="border rounded-xl p-6 hover:shadow-lg transition bg-white">
//                         {/* Order Header */}
//                         <div className="flex justify-between items-start mb-4">
//                           <div>
//                             <h3 className="text-xl font-bold text-gray-900">{order.serviceName}</h3>
//                             <p className="text-sm text-gray-500 mt-1">Order ID: #{order.id}</p>
//                           </div>
//                           <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
//                             {order.status}
//                           </span>
//                         </div>

//                         {/* Order Info Grid */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                           <div className="bg-gray-50 p-3 rounded-lg">
//                             <p className="text-gray-500 text-xs mb-1">Order Date</p>
//                             <p className="font-semibold text-gray-900">{order.orderDate}</p>
//                           </div>
//                           <div className="bg-gray-50 p-3 rounded-lg">
//                             <p className="text-gray-500 text-xs mb-1">Expected Completion</p>
//                             <p className="font-semibold text-gray-900">{order.estimatedCompletion}</p>
//                           </div>
//                           <div className="bg-gray-50 p-3 rounded-lg">
//                             <p className="text-gray-500 text-xs mb-1">Amount Paid</p>
//                             <p className="font-semibold text-blue-600">₹{(order.total || 0).toLocaleString()}</p>
//                           </div>
//                         </div>

//                         {/* Progress Bar */}
//                         <div className="mb-4">
//                           <div className="flex justify-between items-center mb-2">
//                             <span className="text-sm font-medium text-gray-600">Project Progress</span>
//                             <span className="text-sm font-bold text-blue-600">{order.progress}%</span>
//                           </div>
//                           <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
//                             <div 
//                               className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(order.progress)}`}
//                               style={{ width: `${order.progress}%` }}
//                             ></div>
//                           </div>
//                         </div>

//                         {/* Tracking Timeline */}
//                         {order.trackingUpdates && order.trackingUpdates.length > 0 && (
//                           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                             <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
//                               <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                               </svg>
//                               Recent Updates
//                             </h4>
//                             <div className="space-y-3">
//                               {order.trackingUpdates.map((update, idx) => (
//                                 <div key={idx} className="flex items-start">
//                                   <div className="flex flex-col items-center mr-3">
//                                     <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
//                                     {idx !== order.trackingUpdates!.length - 1 && (
//                                       <div className="w-0.5 h-full bg-blue-300 mt-1 min-h-[30px]"></div>
//                                     )}
//                                   </div>
//                                   <div className="flex-1 pb-2">
//                                     <p className="text-xs text-gray-500 mb-1">{update.date}</p>
//                                     <p className="text-sm text-gray-700 font-medium">{update.message}</p>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Order History Tab */}
//             {activeTab === 'history' && (
//               <div>
//                 {completedOrders.length === 0 ? (
//                   <div className="text-center py-16">
//                     <div className="text-6xl mb-4">📋</div>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-2">No order history</h3>
//                     <p className="text-gray-600 mb-6">Your completed orders will appear here</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {completedOrders.map((order) => (
//                       <div key={order.id} className="border rounded-xl p-5 hover:shadow-md transition bg-white">
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <div className="flex items-center gap-3 mb-2">
//                               <h3 className="text-lg font-bold text-gray-900">{order.serviceName}</h3>
//                               <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
//                                 {order.status}
//                               </span>
//                             </div>
//                             <p className="text-sm text-gray-500 mb-3">Order ID: #{order.id}</p>
                            
//                             <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
//                               <span className="flex items-center">
//                                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                 </svg>
//                                 Ordered: {order.orderDate}
//                               </span>
//                               <span className="flex items-center text-green-600">
//                                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 Completed: {order.estimatedCompletion}
//                               </span>
//                             </div>
//                           </div>

//                           {/* Price */}
//                           <div className="text-right flex-shrink-0">
//                             <div className="text-2xl font-bold text-blue-600">₹{order.total.toLocaleString()}</div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
//app/user_dashboard/page.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

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
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [activeOrders, setActiveOrders] = useState<Order[]>([])
  const [completedOrders, setCompletedOrders] = useState<Order[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Initialize client-side flag
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Check authentication only on client
    if (!isClient) return
    
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
      setIsLoggedIn(loggedIn)
      
      if (!loggedIn) {
        window.location.href = '/login'
        return
      }
      
      setUserName(localStorage.getItem('userName') || 'User')
      setUserEmail(localStorage.getItem('userEmail') || '')
      
      // Load data
      loadCartItems()
      loadOrders()
      loadDocuments()
    }
  }, [isClient])

  const loadCartItems = () => {
    if (typeof window === 'undefined') return
    try {
      const items = localStorage.getItem('cartItems')
      if (items) {
        setCartItems(JSON.parse(items))
      }
    } catch (error) {
      console.error('Error loading cart items:', error)
    }
  }

  const loadOrders = () => {
    if (typeof window === 'undefined') return
    try {
      // Load active orders - demo data if empty
      const active = localStorage.getItem('activeOrders')
      if (active) {
        setActiveOrders(JSON.parse(active))
      } else {
        // Demo data for visualization
        const demoActiveOrders: Order[] = [
          {
            id: 'ORD001',
            serviceName: 'GST Registration',
            status: 'In Progress',
            orderDate: '2024-11-15',
            estimatedCompletion: '2024-11-25',
            total: 2999,
            progress: 65,
            trackingUpdates: [
              { date: '2024-11-15 10:30 AM', message: 'Order received and verified' },
              { date: '2024-11-16 02:15 PM', message: 'Documents submitted to GST portal' },
              { date: '2024-11-18 11:00 AM', message: 'Application under review by authorities' },
              { date: '2024-11-20 04:30 PM', message: 'Verification in progress' }
            ]
          }
        ]
        setActiveOrders(demoActiveOrders)
      }
      
      // Load completed orders
      const completed = localStorage.getItem('completedOrders')
      if (completed) {
        setCompletedOrders(JSON.parse(completed))
      } else {
        // Demo data
        const demoCompletedOrders: Order[] = [
          {
            id: 'ORD000',
            serviceName: 'Trademark Registration',
            status: 'Completed',
            orderDate: '2024-10-01',
            estimatedCompletion: '2024-10-20',
            total: 9999,
            progress: 100
          }
        ]
        setCompletedOrders(demoCompletedOrders)
      }
    } catch (error) {
      console.error('Error loading orders:', error)
    }
  }

  const loadDocuments = () => {
    if (typeof window === 'undefined') return
    try {
      const docs = localStorage.getItem('documents')
      if (docs) {
        setDocuments(JSON.parse(docs))
      } else {
        // Demo documents
        const demoDocs: Document[] = [
          {
            id: 'DOC001',
            name: 'GST Certificate.pdf',
            type: 'Certificate',
            uploadDate: '2024-11-20',
            size: '245 KB',
            orderId: 'ORD001'
          },
          {
            id: 'DOC002',
            name: 'PAN Card.pdf',
            type: 'Identity Proof',
            uploadDate: '2024-11-15',
            size: '180 KB',
            orderId: 'ORD001'
          }
        ]
        setDocuments(demoDocs)
      }
    } catch (error) {
      console.error('Error loading documents:', error)
    }
  }

  const removeFromCart = (slug: string) => {
    const updated = cartItems.filter(item => item.slug !== slug)
    setCartItems(updated)
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(updated))
      // Dispatch events to update header
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
      localStorage.removeItem('authToken')
    }
    window.location.href = '/'
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Under Review': return 'bg-yellow-100 text-yellow-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Payment Pending': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'bg-red-500'
    if (progress < 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getDocumentIcon = (type: string) => {
    switch(type) {
      case 'Certificate':
        return (
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        )
      case 'Identity Proof':
        return (
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
          </svg>
        )
      default:
        return (
          <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )
    }
  }

  // Don't render until client-side to avoid hydration issues
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

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 space-y-3">
              <Link href="/" className="block text-gray-700 py-2">Home</Link>
              <Link href="/#services" className="block text-gray-700 py-2">Services</Link>
              <Link href="/user_dashboard" className="block text-blue-600 font-semibold py-2">Dashboard</Link>
              <div className="py-2 border-t">
                <p className="text-sm text-gray-600">{userName}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full text-left text-red-600 py-2"
              >
                Logout
              </button>
            </div>
          </div>
        )}
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
            <div className="hidden lg:block">
              <svg className="w-24 h-24 text-blue-300 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
              </svg>
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
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Orders</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{activeOrders.length}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{completedOrders.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Spent</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  ₹{completedOrders.reduce((sum, order) => sum + (order.total || 0), 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              href="/#services"
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
            >
              <svg className="w-10 h-10 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm font-medium text-gray-700">New Service</span>
            </Link>
            <Link 
              href="/checkout"
              className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
            >
              <svg className="w-10 h-10 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">View Cart</span>
            </Link>
            <button
              onClick={() => setActiveTab('documents')}
              className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
            >
              <svg className="w-10 h-10 text-purple-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">My Documents</span>
            </button>
            <Link 
              href="/contact"
              className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition"
            >
              <svg className="w-10 h-10 text-orange-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Get Support</span>
            </Link>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap space-x-4 md:space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                </svg>
                Overview
              </button>
              <button
                onClick={() => setActiveTab('cart')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition whitespace-nowrap ${
                  activeTab === 'cart'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Cart ({cartItems.length})
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition whitespace-nowrap ${
                  activeTab === 'active'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Active Orders
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition whitespace-nowrap ${
                  activeTab === 'history'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                History
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition whitespace-nowrap ${
                  activeTab === 'documents'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Documents
              </button>
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
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Expected completion: {order.estimatedCompletion}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(order.progress)}`}
                              style={{ width: `${order.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                      <button 
                        onClick={() => setActiveTab('active')}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View all active orders →
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">No recent activity</p>
                    </div>
                  )}
                </div>

                {/* Pending Cart Items */}
                {cartItems.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Items in Your Cart</h3>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="w-8 h-8 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <div>
                            <p className="font-semibold text-gray-900">You have {cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart</p>
                            <p className="text-sm text-gray-600">Total: ₹{calculateCartTotal().toLocaleString()}</p>
                          </div>
                        </div>
                        <Link
                          href="/checkout"
                          className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition font-medium"
                        >
                          Checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Support Section */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <svg className="w-12 h-12 text-purple-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
                      <p className="text-gray-600 mb-4">Our expert team is available 24/7 to assist you with any queries or concerns.</p>
                      <div className="flex flex-wrap gap-3">
                        <a href="tel:+919876543210" className="flex items-center px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition text-sm font-medium border border-purple-200">
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
                        <Link href="/contact" className="flex items-center px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition text-sm font-medium border border-purple-200">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Email
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cart Tab */}
            {activeTab === 'cart' && (
              <div>
                {cartItems.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🛒</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-gray-600 mb-6">Browse our services and add them to your cart</p>
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
                                  onClick={() => removeFromCart(item.slug)}
                                  className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                                  title="Remove from cart"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{item.short}</p>
                              
                              <div className="flex flex-wrap gap-3 text-sm">
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
                    </div>

                    {/* Cart Summary */}
                    <div className="border-t pt-6 bg-gray-50 rounded-xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-gray-700">Total Amount:</span>
                        <span className="text-3xl font-bold text-blue-600">₹{calculateCartTotal().toLocaleString()}</span>
                      </div>
                      <Link
                        href="/checkout"
                        className="w-full block text-center bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg transition shadow-lg hover:shadow-xl"
                      >
                        Proceed to Checkout →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Active Orders Tab */}
            {activeTab === 'active' && (
              <div>
                {activeOrders.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No active orders</h3>
                    <p className="text-gray-600 mb-6">Your active service orders will appear here</p>
                    <Link
                      href="/#services"
                      className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                      Browse Services
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {activeOrders.map((order) => (
                      <div key={order.id} className="border rounded-xl p-6 hover:shadow-lg transition bg-white">
                        {/* Order Header */}
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{order.serviceName}</h3>
                            <p className="text-sm text-gray-500 mt-1">Order ID: #{order.id}</p>
                          </div>
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>

                        {/* Order Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-gray-500 text-xs mb-1">Order Date</p>
                            <p className="font-semibold text-gray-900">{order.orderDate}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-gray-500 text-xs mb-1">Expected Completion</p>
                            <p className="font-semibold text-gray-900">{order.estimatedCompletion}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-gray-500 text-xs mb-1">Amount Paid</p>
                            <p className="font-semibold text-blue-600">₹{(order.total || 0).toLocaleString()}</p>
                          </div>
                        </div>

                        {/* Progress Bar */}
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

                        {/* Tracking Timeline */}
                        {order.trackingUpdates && order.trackingUpdates.length > 0 && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                              Recent Updates
                            </h4>
                            <div className="space-y-3">
                              {order.trackingUpdates.map((update, idx) => (
                                <div key={idx} className="flex items-start">
                                  <div className="flex flex-col items-center mr-3">
                                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                    {idx !== order.trackingUpdates!.length - 1 && (
                                      <div className="w-0.5 h-full bg-blue-300 mt-1 min-h-[30px]"></div>
                                    )}
                                  </div>
                                  <div className="flex-1 pb-2">
                                    <p className="text-xs text-gray-500 mb-1">{update.date}</p>
                                    <p className="text-sm text-gray-700 font-medium">{update.message}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Order History Tab */}
            {activeTab === 'history' && (
              <div>
                {completedOrders.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">📋</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No order history</h3>
                    <p className="text-gray-600 mb-6">Your completed orders will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {completedOrders.map((order) => (
                      <div key={order.id} className="border rounded-xl p-5 hover:shadow-md transition bg-white">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-gray-900">{order.serviceName}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mb-3">Order ID: #{order.id}</p>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Ordered: {order.orderDate}
                              </span>
                              <span className="flex items-center text-green-600">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Completed: {order.estimatedCompletion}
                              </span>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right flex-shrink-0">
                            <div className="text-2xl font-bold text-blue-600">₹{order.total.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div>
                {documents.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">📄</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No documents yet</h3>
                    <p className="text-gray-600 mb-6">Your uploaded documents and certificates will appear here</p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">Your Documents</h3>
                      <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Upload Document
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {documents.map((doc) => (
                        <div key={doc.id} className="border rounded-xl p-5 hover:shadow-md transition bg-white">
                          <div className="flex items-start gap-4">
                            <div className="bg-gray-100 p-3 rounded-lg">
                              {getDocumentIcon(doc.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 mb-1 truncate">{doc.name}</h4>
                              <p className="text-sm text-gray-500 mb-2">{doc.type}</p>
                              <div className="flex items-center gap-3 text-xs text-gray-600">
                                <span className="flex items-center">
                                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {doc.uploadDate}
                                </span>
                                <span>{doc.size}</span>
                              </div>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Looking for More Services?</h2>
          <p className="text-blue-100 mb-6">Explore our comprehensive range of tax and business services</p>
          <Link
            href="/#services"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-semibold"
          >
            View All Services
          </Link>
        </div>
      </div>
    </div>
  )
}