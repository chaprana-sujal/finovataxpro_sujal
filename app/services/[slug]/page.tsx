// app/services/[slug]/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

interface ServicePlan {
  id: number;
  name: string;
  price: string;
  features: string;
  is_recommended: boolean;
}

interface Service {
  id: number;
  name: string;
  description: string;
  detail_description?: string;
  is_active: boolean;
  category: number;
  plans: ServicePlan[];
  features: string;
  requirements: string;
  deliverables: string;
  timeline: string;
  icon: string;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      const serviceId = params?.slug as string;
      if (!serviceId) {
        setError('No service ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${serviceId}/`);
        if (!response.ok) {
          throw new Error('Service not found');
        }
        const data = await response.json();
        setService(data);
      } catch (err) {
        setError('Service not found');
      } finally {
        setLoading(false);
      }
    };

    fetchService();

    // Check login status from localStorage
    if (typeof window !== 'undefined') {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    }
  }, [params]);

  const handleRegisterNow = (plan?: ServicePlan) => {
    if (!service || !plan) return;

    const cartItem = {
      slug: `service-${service.id}-plan-${plan.id}`,
      icon: service.icon || '📋',
      title: `${service.name} - ${plan.name}`,
      category: 'Professional Service',
      short: service.description ? service.description.substring(0, 100) + '...' : '',
      timeline: service.timeline || 'TBD',
      price: parseFloat(plan.price.replace(/[^0-9.]/g, '')),
      price_display: `₹${plan.price}`
    };

    if (!isLoggedIn) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('pendingService', JSON.stringify(cartItem));
        localStorage.setItem('returnUrl', window.location.pathname);
      }
      router.push('/register');
    } else {
      if (typeof window !== 'undefined') {
        const existingCart = localStorage.getItem('cartItems');
        const cart = existingCart ? JSON.parse(existingCart) : [];

        const isInCart = cart.some((item: any) => item.slug === cartItem.slug);
        if (!isInCart) {
          cart.push(cartItem);
          localStorage.setItem('cartItems', JSON.stringify(cart));
          // Dispatch events to update header
          window.dispatchEvent(new Event('storage'));
          window.dispatchEvent(new Event('cartUpdated'));
        }
      }
      router.push('/checkout');
    }
  };

  const handleContactExpert = () => {
    router.push('/contact');
  };

  // Parse newline-separated string to array
  const parseList = (str: string): string[] => {
    if (!str) return [];
    return str.split('\n').filter(s => s.trim());
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  // Service not found
  if (error || !service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Service Not Found</h1>
          <p className="text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
          <Link
            href="/#services"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Browse All Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/#services" className="hover:text-blue-600 transition">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{service.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              {/* Service Header */}
              <div className="flex items-start mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-3xl mr-4 flex-shrink-0">
                  {service.icon || '📋'}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{service.name}</h1>
                </div>
              </div>

              {/* Full Description */}
              <div className="prose max-w-none mb-8">
                <p className="text-xl text-gray-500 font-normal mb-6 border-b pb-6">{service.description}</p>
                {service.detail_description && (
                  <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {service.detail_description}
                  </div>
                )}
              </div>

              {/* What's Included */}
              {service.features && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 text-green-600">
                      ✓
                    </span>
                    What's Included
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {parseList(service.features).map((feature, idx) => (
                      <div key={idx} className="flex items-start bg-green-50/50 p-3 rounded-lg">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents Required */}
              {service.requirements && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3 text-orange-600">
                      📄
                    </span>
                    Documents Required
                  </h2>
                  <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                    <ul className="space-y-3">
                      {parseList(service.requirements).map((req, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* What You'll Receive */}
              {service.deliverables && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 text-blue-600">
                      📦
                    </span>
                    What You'll Receive
                  </h2>
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <div className="grid gap-4">
                      {parseList(service.deliverables).map((item, idx) => (
                        <div key={idx} className="flex items-center">
                          <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Service Plans */}
              {service.plans && service.plans.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      💰
                    </span>
                    Available Plans
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {service.plans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`border rounded-xl p-6 ${plan.is_recommended ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                      >
                        {plan.is_recommended && (
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium mb-3">
                            Recommended
                          </span>
                        )}
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                        <div className="text-3xl font-bold text-blue-600 mb-4">₹{plan.price}</div>
                        <ul className="space-y-2 mb-4">
                          {parseList(plan.features).map((feature, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => handleRegisterNow(plan)}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                          {isLoggedIn ? 'Add to Cart' : 'Get Started'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Why Choose Us Section */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose FinovaTaxPro?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Expert Team</h4>
                      <p className="text-sm text-gray-600">Qualified CAs and legal experts</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Quick Turnaround</h4>
                      <p className="text-sm text-gray-600">Fast processing and delivery</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Transparent Pricing</h4>
                      <p className="text-sm text-gray-600">No hidden charges</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Post-Service Support</h4>
                      <p className="text-sm text-gray-600">Ongoing assistance included</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              {/* Service Stats */}
              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Delivery Time</div>
                    <div className="text-gray-900 font-medium">{service.timeline || '3-5 working days'}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Expert Support</div>
                    <div className="text-gray-900 font-medium">Qualified Professionals</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">24/7 Assistance</div>
                    <div className="text-gray-900 font-medium">Always available</div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              {service.plans && service.plans.length > 0 && (
                <div className="text-center mb-6 pb-6 border-b">
                  <div className="text-sm text-gray-600 mb-2">Starting at</div>
                  <div className="text-4xl font-bold text-gray-900">
                    ₹{Math.min(...service.plans.map(p => parseFloat(p.price)))}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">+ Government fees (if applicable)</div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleRegisterNow(service.plans?.[0])}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isLoggedIn ? '🛒 Proceed to Checkout' : '🚀 Get Started Now'}
                </button>

                <button
                  onClick={handleContactExpert}
                  className="w-full border-2 border-blue-600 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition font-semibold"
                >
                  💬 Talk to Expert
                </button>
              </div>

              {/* Contact Information */}
              <div className="pt-6 border-t">
                <div className="text-sm font-semibold text-gray-900 mb-3">Need Help?</div>
                <div className="space-y-3">
                  <a href="tel:+919876543210" className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +91 98765 43210
                  </a>
                  <a href="mailto:info@finovataxpro.com" className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@finovataxpro.com
                  </a>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600">500+</div>
                    <div className="text-xs text-gray-600">Happy Clients</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-600">4.8★</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}