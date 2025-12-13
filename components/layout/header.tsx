'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const { data: categories, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/service-categories/`, fetcher);

  // Handle both array (if pagination off) and paginated response (results array)
  const serviceCategories = Array.isArray(categories) ? categories : (categories?.results || []);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
      updateCartCount();

      const handleStorageChange = () => {
        updateCartCount();
      };
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('cartUpdated', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('cartUpdated', handleStorageChange);
      };
    }
  }, []);

  const updateCartCount = () => {
    if (typeof window !== 'undefined') {
      const items = localStorage.getItem('cartItems');
      setCartCount(items ? JSON.parse(items).length : 0);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
    }
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <header className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 shadow-lg fixed top-0 left-0 right-0 z-50 overflow-visible">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-blue-700/20 animate-gradient-flow"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 -left-20 w-64 h-64 bg-cyan-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute top-0 -right-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-64 h-64 bg-cyan-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse-slow animation-delay-4000"></div>
        <div className="absolute top-2 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float-1 shadow-lg shadow-cyan-400/50"></div>
        <div className="absolute top-4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-float-2 shadow-lg shadow-blue-400/50"></div>
        <div className="absolute top-3 left-1/3 w-2 h-2 bg-cyan-300 rounded-full animate-float-3 shadow-lg shadow-cyan-300/50"></div>
        <div className="absolute top-2 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-float-4 shadow-lg shadow-blue-300/50"></div>
        <div className="absolute top-5 left-2/3 w-1.5 h-1.5 bg-cyan-500 rounded-full animate-float-5 shadow-lg shadow-cyan-500/50"></div>
        <div className="absolute inset-0 bg-scanlines opacity-5"></div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <span className="text-white font-bold text-sm">FT</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent">FinovaTaxPro</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-6 xl:space-x-8">
            <a href="/" className="px-3 py-2 text-slate-200 hover:text-cyan-300 transition text-sm font-medium">
              Home
            </a>

            {serviceCategories.map((category: any) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => setActiveMenu(category.name)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  suppressHydrationWarning
                  className="px-3 py-2 text-slate-200 hover:text-cyan-300 transition text-sm font-medium flex items-center">
                  {category.name}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {activeMenu === category.name && (
                  <div className="absolute left-0 top-full mt-0 w-64 bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-800/95 backdrop-blur-lg shadow-2xl rounded-md py-2 border border-cyan-500/30 z-50">
                    {category.services.map((service: any) => (
                      <a
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="block px-4 py-2.5 text-sm text-slate-200 hover:bg-cyan-500/20 hover:text-cyan-200 transition"
                        onClick={() => setActiveMenu(null)}
                      >
                        {service.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* User Account / Login */}
            {mounted && (
              <>
                {isLoggedIn ? (
                  <div className="flex items-center space-x-3">
                    {/* Cart Icon with Badge */}
                    <a
                      href="/checkout"
                      className="relative p-2 text-slate-200 hover:text-cyan-300 transition hover:bg-cyan-500/10 rounded-lg"
                      title="View Cart"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                          {cartCount}
                        </span>
                      )}
                    </a>

                    {/* Dashboard Link */}
                    <a
                      href="/user_dashboard"
                      className="flex items-center space-x-2 px-3 py-2 text-slate-200 hover:text-cyan-300 transition hover:bg-cyan-500/10 rounded-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm font-medium">Dashboard</span>
                    </a>
                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm font-medium text-red-300 hover:text-red-200 transition"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <a
                    href="/login"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-md hover:from-cyan-600 hover:to-blue-700 transition font-medium text-sm shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-0.5"
                  >
                    Get Started
                  </a>
                )}
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            suppressHydrationWarning
            className="xl:hidden p-2 rounded-md hover:bg-blue-800/50 transition"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-cyan-500/30 bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-800/95 backdrop-blur-lg max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-2">
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-slate-200 hover:bg-cyan-500/20 transition font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </a>

            {serviceCategories.map((category: any) => (
              <div key={category.id}>
                <button
                  suppressHydrationWarning
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-slate-200 hover:bg-cyan-500/20 transition font-medium"
                  onClick={() => setActiveMobileMenu(activeMobileMenu === category.name ? null : category.name)}
                >
                  {category.name}
                  <svg
                    className={`w-4 h-4 transition-transform ${activeMobileMenu === category.name ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeMobileMenu === category.name && (
                  <div className="ml-4 mt-1 space-y-1">
                    {category.services.map((service: any) => (
                      <a
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="block px-3 py-2 text-sm rounded-md text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-200 transition"
                        onClick={() => setMobileOpen(false)}
                      >
                        {service.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {mounted && (
              <div className="pt-3 border-t border-cyan-500/30">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    {/* Cart Link Mobile */}
                    <a
                      href="/checkout"
                      className="flex items-center justify-between px-3 py-2 rounded-md text-slate-200 hover:bg-cyan-500/20 font-medium"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        My Cart
                      </span>
                      {cartCount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                          {cartCount}
                        </span>
                      )}
                    </a>

                    {/* Dashboard Link Mobile */}
                    <a
                      href="/user_dashboard"
                      className="flex items-center px-3 py-2 rounded-md text-slate-200 hover:bg-cyan-500/20 font-medium"
                      onClick={() => setMobileOpen(false)}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Dashboard
                    </a>

                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-md text-red-300 hover:bg-red-900/20 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <a
                    href="/register"
                    className="block w-full text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2.5 rounded-md hover:from-cyan-600 hover:to-blue-700 transition font-medium shadow-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    Get Started
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradient-flow {
          0%, 100% { transform: translateX(-10%) translateY(-10%) scale(1); }
          50% { transform: translateX(10%) translateY(10%) scale(1.05); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0); opacity: 0.6; }
          50% { transform: translate(50px, -30px); opacity: 1; }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0); opacity: 0.5; }
          50% { transform: translate(-40px, 35px); opacity: 1; }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0); opacity: 0.7; }
          50% { transform: translate(60px, 25px); opacity: 1; }
        }
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0); opacity: 0.4; }
          50% { transform: translate(-35px, -40px); opacity: 1; }
        }
        @keyframes float-5 {
          0%, 100% { transform: translate(0, 0); opacity: 0.6; }
          50% { transform: translate(45px, -35px); opacity: 1; }
        }
        .animate-gradient-flow {
          animation: gradient-flow 20s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-float-1 {
          animation: float-1 10s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-2 12s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: float-3 14s ease-in-out infinite;
        }
        .animate-float-4 {
          animation: float-4 11s ease-in-out infinite;
        }
        .animate-float-5 {
          animation: float-5 13s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .bg-scanlines {
          background-image: repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.03),
            rgba(255, 255, 255, 0.03) 1px,
            transparent 1px,
            transparent 2px
          );
        }
      `}</style>
    </header>
  );
}
