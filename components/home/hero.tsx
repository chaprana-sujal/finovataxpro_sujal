// components/home/Hero.tsx
// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Hero() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');

//   const handleGetStarted = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Store email in localStorage and redirect to register
//     if (email) {
//       localStorage.setItem('prefilledEmail', email);
//       router.push('/register');
//     }
//   };

//   return (
//     <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left Content */}
//           <div className="text-center lg:text-left">
//             {/* Badge */}
//             <div className="inline-block mb-6">
//               <div className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
//                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//                 <span>Trusted by 10,000+ Businesses</span>
//               </div>
//             </div>

//             {/* Main Heading */}
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//               Complete Your 
//               <span className="text-blue-600"> Tax Filing</span> with Confidence
//             </h1>

//             {/* Subheading */}
//             <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
//               Fast, affordable, and expert-guided tax compliance services. We handle the complexities so you can focus on growing your business.
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
//               <button
//                 onClick={() => router.push('/services')}
//                 className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//               >
//                 Explore Services
//               </button>
//               <button
//                 onClick={() => router.push('/contact')}
//                 className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition text-lg font-semibold"
//               >
//                 Talk to Expert
//               </button>
//             </div>

//             {/* Quick Start Form */}
//             <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 max-w-md mx-auto lg:mx-0">
//               <form onSubmit={handleGetStarted} className="flex flex-col sm:flex-row gap-3">
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   required
//                   className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold whitespace-nowrap"
//                 >
//                   Get Started →
//                 </button>
//               </form>
//               <p className="text-xs text-gray-500 mt-2 text-center sm:text-left">
//                 Free consultation • No credit card required
//               </p>
//             </div>

//             {/* Trust Indicators */}
//             <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600">
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//                 <span>100% Secure</span>
//               </div>
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//                 <span>Expert CA Support</span>
//               </div>
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//                 <span>Fast Processing</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Content - Dashboard Mockup */}
//           <div className="relative hidden lg:block">
//             <div className="relative">
//               {/* Floating Elements */}
//               <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-xl border border-gray-100 animate-float">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                     <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-gray-900">GST Filed</p>
//                     <p className="text-xs text-gray-500">2 minutes ago</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-xl border border-gray-100 animate-float animation-delay-2000">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                     <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-gray-900">₹2.5L Saved</p>
//                     <p className="text-xs text-gray-500">In tax planning</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Main Dashboard Card */}
//               <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 shadow-2xl">
//                 <div className="bg-white rounded-2xl p-6 shadow-lg">
//                   <div className="flex items-center justify-between mb-6">
//                     <span className="text-sm font-semibold text-gray-500">Compliance Dashboard</span>
//                     <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
//                       All Clear
//                     </span>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
//                           <span className="text-lg">📊</span>
//                         </div>
//                         <span className="text-gray-700 font-medium">GST Returns</span>
//                       </div>
//                       <span className="font-bold text-green-600 flex items-center">
//                         <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                         </svg>
//                         Filed
//                       </span>
//                     </div>

//                     <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
//                           <span className="text-lg">💼</span>
//                         </div>
//                         <span className="text-gray-700 font-medium">Income Tax</span>
//                       </div>
//                       <span className="font-bold text-green-600 flex items-center">
//                         <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                         </svg>
//                         Filed
//                       </span>
//                     </div>

//                     <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
//                           <span className="text-lg">📋</span>
//                         </div>
//                         <span className="text-gray-700 font-medium">ROC Compliance</span>
//                       </div>
//                       <span className="font-bold text-green-600 flex items-center">
//                         <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                         </svg>
//                         Updated
//                       </span>
//                     </div>
//                   </div>

//                   {/* Progress Bar */}
//                   <div className="mt-6 pt-4 border-t border-gray-200">
//                     <div className="flex justify-between text-sm mb-2">
//                       <span className="text-gray-600">Annual Compliance</span>
//                       <span className="font-semibold text-gray-900">100%</span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom CSS for animations */}
//       <style jsx>{`
//         @keyframes blob {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </section>
//   );
// }
// another theme code
// 'use client';
// import { useState } from 'react';

// export default function Hero() {
//   const [email, setEmail] = useState('');

//   const handleGetStarted = () => {
//     // Store email in localStorage and redirect to register
//     if (email) {
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('prefilledEmail', email);
//         window.location.href = '/register';
//       }
//     }
//   };

//   return (
//     <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
//       {/* Animated Background Pattern */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Animated gradient waves */}
//         <div className="absolute inset-0 opacity-30">
//           <div className="absolute top-0 left-0 w-full h-full">
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 animate-gradient-flow"></div>
//           </div>
//         </div>

//         {/* Grid pattern overlay */}
//         <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

//         {/* Glowing orbs */}
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse-slow"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse-slow animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse-slow animation-delay-4000"></div>

//         {/* Floating light particles */}
//         <div className="absolute top-20 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-float-1 shadow-lg shadow-cyan-400/50"></div>
//         <div className="absolute top-40 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-float-2 shadow-lg shadow-blue-400/50"></div>
//         <div className="absolute bottom-40 left-1/3 w-2.5 h-2.5 bg-cyan-300 rounded-full animate-float-3 shadow-lg shadow-cyan-300/50"></div>
//         <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-float-4 shadow-lg shadow-blue-300/50"></div>
//         <div className="absolute bottom-1/4 left-2/3 w-2 h-2 bg-cyan-500 rounded-full animate-float-5 shadow-lg shadow-cyan-500/50"></div>
//         <div className="absolute top-2/3 right-1/2 w-1 h-1 bg-blue-400 rounded-full animate-float-6 shadow-lg shadow-blue-400/50"></div>

//         {/* Subtle scan lines effect */}
//         <div className="absolute inset-0 bg-scanlines opacity-5"></div>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left Content */}
//           <div className="text-center lg:text-left">
//             {/* Badge */}
//             <div className="inline-block mb-6">
//               <div className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
//                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//                 <span>Trusted by 10,000+ Businesses</span>
//               </div>
//             </div>

//             {/* Main Heading */}
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
//               Complete Your 
//               <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent"> Tax Filing</span> with Confidence
//             </h1>

//             {/* Subheading */}
//             <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
//               Fast, affordable, and expert-guided tax compliance services. We handle the complexities so you can focus on growing your business.
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
//               <button
//                 onClick={() => window.location.href = '/services'}
//                 className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition text-lg font-semibold shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-0.5"
//               >
//                 Explore Services
//               </button>
//               <button
//                 onClick={() => window.location.href = '/contact'}
//                 className="border-2 border-cyan-400 text-cyan-300 px-8 py-4 rounded-lg hover:bg-cyan-500/10 backdrop-blur-sm transition text-lg font-semibold"
//               >
//                 Talk to Expert
//               </button>
//             </div>

//             {/* Quick Start Form */}
//             <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-cyan-400/20 max-w-md mx-auto lg:mx-0">
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   className="flex-1 px-4 py-3 bg-white/90 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
//                 />
//                 <button
//                   onClick={handleGetStarted}
//                   className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition font-semibold whitespace-nowrap shadow-lg hover:shadow-cyan-500/30"
//                 >
//                   Get Started →
//                 </button>
//               </div>
//               <p className="text-xs text-slate-400 mt-2 text-center sm:text-left">
//                 Free consultation • No credit card required
//               </p>
//             </div>

//             {/* Trust Indicators */}
//             <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-300">
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-cyan-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//                 <span>100% Secure</span>
//               </div>
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-cyan-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//                 <span>Expert CA Support</span>
//               </div>
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-cyan-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//                 <span>Fast Processing</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Content - Dashboard Mockup */}
//           <div className="relative hidden lg:block">
//             <div className="relative">
//               {/* Floating Elements */}
//               <div className="absolute -top-4 -left-4 bg-gradient-to-br from-slate-900/90 to-blue-900/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-cyan-400/20 animate-float-card">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-400/50">
//                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-white">GST Filed</p>
//                     <p className="text-xs text-slate-400">2 minutes ago</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-slate-900/90 to-blue-900/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-cyan-400/20 animate-float-card animation-delay-2000">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-400/50">
//                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-white">₹2.5L Saved</p>
//                     <p className="text-xs text-slate-400">In tax planning</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Main Dashboard Card */}
//               <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-8 shadow-2xl">
//                 <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
//                   <div className="flex items-center justify-between mb-6">
//                     <span className="text-sm font-semibold text-slate-700">Compliance Dashboard</span>
//                     <span className="bg-gradient-to-r from-cyan-100 to-cyan-200 text-cyan-800 text-xs font-bold px-3 py-1 rounded-full">
//                       All Clear
//                     </span>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="flex justify-between items-center p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-lg flex items-center justify-center mr-3 shadow">
//                           <span className="text-lg">📊</span>
//                         </div>
//                         <span className="text-slate-700 font-medium">GST Returns</span>
//                       </div>
//                       <span className="font-bold text-cyan-600 flex items-center">
//                         <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                         </svg>
//                         Filed
//                       </span>
//                     </div>

//                     <div className="flex justify-between items-center p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-3 shadow">
//                           <span className="text-lg">💼</span>
//                         </div>
//                         <span className="text-slate-700 font-medium">Income Tax</span>
//                       </div>
//                       <span className="font-bold text-cyan-600 flex items-center">
//                         <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                         </svg>
//                         Filed
//                       </span>
//                     </div>

//                     <div className="flex justify-between items-center p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center mr-3 shadow">
//                           <span className="text-lg">📋</span>
//                         </div>
//                         <span className="text-slate-700 font-medium">ROC Compliance</span>
//                       </div>
//                       <span className="font-bold text-cyan-600 flex items-center">
//                         <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                         </svg>
//                         Updated
//                       </span>
//                     </div>
//                   </div>

//                   {/* Progress Bar */}
//                   <div className="mt-6 pt-4 border-t border-slate-200">
//                     <div className="flex justify-between text-sm mb-2">
//                       <span className="text-slate-600">Annual Compliance</span>
//                       <span className="font-semibold text-slate-900">100%</span>
//                     </div>
//                     <div className="w-full bg-slate-200 rounded-full h-2">
//                       <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 h-2 rounded-full shadow-sm" style={{ width: '100%' }}></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom CSS for animations */}
//       <style jsx>{`
//         @keyframes gradient-flow {
//           0%, 100% { transform: translateX(-10%) translateY(-10%) scale(1); }
//           50% { transform: translateX(10%) translateY(10%) scale(1.05); }
//         }
//         @keyframes pulse-slow {
//           0%, 100% { opacity: 0.3; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(1.05); }
//         }
//         @keyframes float-1 {
//           0%, 100% { transform: translate(0, 0); opacity: 0.6; }
//           50% { transform: translate(80px, -80px); opacity: 1; }
//         }
//         @keyframes float-2 {
//           0%, 100% { transform: translate(0, 0); opacity: 0.5; }
//           50% { transform: translate(-60px, 70px); opacity: 1; }
//         }
//         @keyframes float-3 {
//           0%, 100% { transform: translate(0, 0); opacity: 0.7; }
//           50% { transform: translate(90px, 50px); opacity: 1; }
//         }
//         @keyframes float-4 {
//           0%, 100% { transform: translate(0, 0); opacity: 0.4; }
//           50% { transform: translate(-50px, -70px); opacity: 1; }
//         }
//         @keyframes float-5 {
//           0%, 100% { transform: translate(0, 0); opacity: 0.6; }
//           50% { transform: translate(70px, -60px); opacity: 1; }
//         }
//         @keyframes float-6 {
//           0%, 100% { transform: translate(0, 0); opacity: 0.5; }
//           50% { transform: translate(-80px, 40px); opacity: 1; }
//         }
//         @keyframes float-card {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-15px); }
//         }
//         .animate-gradient-flow {
//           animation: gradient-flow 20s ease-in-out infinite;
//         }
//         .animate-pulse-slow {
//           animation: pulse-slow 8s ease-in-out infinite;
//         }
//         .animate-float-1 {
//           animation: float-1 10s ease-in-out infinite;
//         }
//         .animate-float-2 {
//           animation: float-2 12s ease-in-out infinite;
//         }
//         .animate-float-3 {
//           animation: float-3 14s ease-in-out infinite;
//         }
//         .animate-float-4 {
//           animation: float-4 11s ease-in-out infinite;
//         }
//         .animate-float-5 {
//           animation: float-5 13s ease-in-out infinite;
//         }
//         .animate-float-6 {
//           animation: float-6 15s ease-in-out infinite;
//         }
//         .animate-float-card {
//           animation: float-card 3s ease-in-out infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//         .bg-grid-pattern {
//           background-image: 
//             linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
//           background-size: 50px 50px;
//         }
//         .bg-scanlines {
//           background-image: repeating-linear-gradient(
//             0deg,
//             rgba(255, 255, 255, 0.03),
//             rgba(255, 255, 255, 0.03) 1px,
//             transparent 1px,
//             transparent 2px
//           );
//         }
//       `}</style>
//     </section>
//   );
// }
"use client"
import React, { useState } from 'react';

// Hero Component with Hydration Fix
export default function Hero() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleGetStarted = async () => {
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/consultation/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Request sent! We\'ll contact you shortly.');
        setEmail('');
        // Optional: Redirect after delay or keep on page
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.location.href = '/register';
          }
        }, 2000);
      } else {
        setStatus('error');
        setMessage('Failed to send request. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Only network error.');
    } finally {
      setStatus('idle');
    }
  };

  return (
    <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Enhanced Picture-Based Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Layered gradient waves with more depth */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-700 to-purple-800 animate-gradient-shift"></div>
        </div>

        {/* Abstract geometric shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Hexagonal grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Floating particles with trails */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-particle-1 shadow-glow-cyan"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-particle-2 shadow-glow-blue"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-purple-400 rounded-full animate-particle-3 shadow-glow-purple"></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-cyan-300 rounded-full animate-particle-4 shadow-glow-cyan"></div>
        <div className="absolute bottom-1/4 left-2/3 w-2.5 h-2.5 bg-blue-300 rounded-full animate-particle-5 shadow-glow-blue"></div>

        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="url(#lineGradient)" strokeWidth="2" className="animate-draw-line" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="url(#lineGradient)" strokeWidth="2" className="animate-draw-line animation-delay-2000" />
        </svg>

        {/* Overlapping circles animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10">
          <div className="absolute inset-0 border-4 border-cyan-400 rounded-full animate-ping-slow"></div>
          <div className="absolute inset-8 border-4 border-blue-400 rounded-full animate-ping-slow animation-delay-1000"></div>
          <div className="absolute inset-16 border-4 border-purple-400 rounded-full animate-ping-slow animation-delay-2000"></div>
        </div>

        {/* Subtle scanlines */}
        <div className="absolute inset-0 bg-scanlines opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-block mb-6">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Trusted by 10,000+ Businesses</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Complete Your
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent"> Tax Filing</span> with Confidence
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Fast, affordable, and expert-guided tax compliance services. We handle the complexities so you can focus on growing your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
              <button
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                data-form-type="other"
                suppressHydrationWarning
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition text-lg font-semibold shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-0.5"
              >
                Explore Services
              </button>
              <button
                onClick={() => {
                  const ctaSection = document.getElementById('cta-section');
                  if (ctaSection) {
                    ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                data-form-type="other"
                suppressHydrationWarning
                className="border-2 border-cyan-400 text-cyan-300 px-8 py-4 rounded-lg hover:bg-cyan-500/10 backdrop-blur-sm transition text-lg font-semibold"
              >
                Talk to Expert
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-cyan-400/20 max-w-md mx-auto lg:mx-0">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  data-form-type="other"
                  autoComplete="off"
                  suppressHydrationWarning
                  className="flex-1 px-4 py-3 bg-white/90 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <button
                  onClick={handleGetStarted}
                  data-form-type="other"
                  suppressHydrationWarning
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition font-semibold whitespace-nowrap shadow-lg hover:shadow-cyan-500/30"
                >
                  Get Started →
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2 text-center sm:text-left">
                {message ? (
                  <span className={status === 'error' ? 'text-red-400' : 'text-green-400'}>
                    {message}
                  </span>
                ) : (
                  'Free consultation • No credit card required'
                )}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-300">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-cyan-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% Secure</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-cyan-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Expert CA Support</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-cyan-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Fast Processing</span>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard with Fixed Z-Index */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Floating Elements with Higher Z-Index */}
              <div className="absolute -top-4 -left-4 bg-gradient-to-br from-slate-900/90 to-blue-900/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-cyan-400/20 animate-float-card z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-400/50">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">GST Filed</p>
                    <p className="text-xs text-slate-400">2 minutes ago</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-slate-900/90 to-blue-900/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-cyan-400/20 animate-float-card animation-delay-2000 z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-400/50">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">₹2.5L Saved</p>
                    <p className="text-xs text-slate-400">In tax planning</p>
                  </div>
                </div>
              </div>

              {/* Main Dashboard Card with Lower Z-Index */}
              <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-8 shadow-2xl relative z-10">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-semibold text-slate-700">Compliance Dashboard</span>
                    <span className="bg-gradient-to-r from-cyan-100 to-cyan-200 text-cyan-800 text-xs font-bold px-3 py-1 rounded-full">
                      All Clear
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-lg flex items-center justify-center mr-3 shadow">
                          <span className="text-lg">📊</span>
                        </div>
                        <span className="text-slate-700 font-medium">GST Returns</span>
                      </div>
                      <span className="font-bold text-cyan-600 flex items-center">
                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Filed
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-3 shadow">
                          <span className="text-lg">💼</span>
                        </div>
                        <span className="text-slate-700 font-medium">Income Tax</span>
                      </div>
                      <span className="font-bold text-cyan-600 flex items-center">
                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Filed
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center mr-3 shadow">
                          <span className="text-lg">📋</span>
                        </div>
                        <span className="text-slate-700 font-medium">ROC Compliance</span>
                      </div>
                      <span className="font-bold text-cyan-600 flex items-center">
                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Updated
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Annual Compliance</span>
                      <span className="font-semibold text-slate-900">100%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 h-2 rounded-full shadow-sm" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { transform: translateX(-5%) translateY(-5%) rotate(0deg); }
          50% { transform: translateX(5%) translateY(5%) rotate(5deg); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes particle-1 {
          0%, 100% { transform: translate(0, 0); opacity: 0.4; }
          25% { transform: translate(100px, -80px); opacity: 1; }
          50% { transform: translate(200px, -40px); opacity: 0.6; }
          75% { transform: translate(150px, 20px); opacity: 0.8; }
        }
        @keyframes particle-2 {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          25% { transform: translate(-80px, 60px); opacity: 0.9; }
          50% { transform: translate(-150px, 120px); opacity: 0.5; }
          75% { transform: translate(-100px, 80px); opacity: 0.7; }
        }
        @keyframes particle-3 {
          0%, 100% { transform: translate(0, 0); opacity: 0.5; }
          33% { transform: translate(120px, 70px); opacity: 1; }
          66% { transform: translate(80px, -30px); opacity: 0.6; }
        }
        @keyframes particle-4 {
          0%, 100% { transform: translate(0, 0); opacity: 0.4; }
          50% { transform: translate(-100px, -100px); opacity: 1; }
        }
        @keyframes particle-5 {
          0%, 100% { transform: translate(0, 0); opacity: 0.6; }
          50% { transform: translate(90px, -70px); opacity: 1; }
        }
        @keyframes ping-slow {
          0% { transform: scale(0.8); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.3; }
          100% { transform: scale(0.8); opacity: 1; }
        }
        @keyframes float-card {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-gradient-shift { animation: gradient-shift 20s ease-in-out infinite; }
        .animate-blob { animation: blob 15s ease-in-out infinite; }
        .animate-particle-1 { animation: particle-1 15s ease-in-out infinite; }
        .animate-particle-2 { animation: particle-2 18s ease-in-out infinite; }
        .animate-particle-3 { animation: particle-3 20s ease-in-out infinite; }
        .animate-particle-4 { animation: particle-4 16s ease-in-out infinite; }
        .animate-particle-5 { animation: particle-5 22s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 6s ease-in-out infinite; }
        .animate-float-card { animation: float-card 3s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .shadow-glow-cyan { box-shadow: 0 0 20px rgba(34, 211, 238, 0.6); }
        .shadow-glow-blue { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6); }
        .shadow-glow-purple { box-shadow: 0 0 20px rgba(168, 85, 247, 0.6); }
        .bg-scanlines {
          background-image: repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03) 1px, transparent 1px, transparent 2px);
        }
      `}</style>
    </section>
  );
}