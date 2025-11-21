// components/home/Testimonials.tsx
'use client';
import { useState, useEffect } from 'react';
import SectionHeading from '../ui/SectionHeading';
import ClientButton from '../ui/client_button';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Rajesh Sharma',
      role: 'CEO, TechStart Solutions',
      company: 'Software Company',
      image: 'https://i.pravatar.cc/150?img=33',
      rating: 5,
      text: 'FinovaTaxPro transformed our company registration process. Their team was professional, responsive, and guided us through every step. We got our incorporation done in just 12 days!',
      service: 'Company Registration'
    },
    {
      name: 'Priya Mehta',
      role: 'Founder, Eco Lifestyle',
      company: 'E-commerce Business',
      image: 'https://i.pravatar.cc/150?img=47',
      rating: 5,
      text: 'I was drowning in GST compliance issues. Their experts not only cleared all my pending returns but also set up an automated system. Best investment for my business!',
      service: 'GST Services'
    },
    {
      name: 'Amit Patel',
      role: 'Managing Director',
      company: 'Patel Traders Pvt Ltd',
      image: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      text: 'Outstanding trademark registration service! They handled everything from search to filing. Got my ® symbol and complete protection. Highly professional team.',
      service: 'Trademark Registration'
    },
    {
      name: 'Sneha Reddy',
      role: 'Co-founder',
      company: 'Urban Cafe Chain',
      image: 'https://i.pravatar.cc/150?img=45',
      rating: 5,
      text: 'Been using their services for 3 years for annual compliance. Never missed a deadline, always proactive with reminders. They are like an extension of our finance team!',
      service: 'Annual Compliance'
    },
    {
      name: 'Vikram Singh',
      role: 'Managing Partner',
      company: 'Singh & Associates LLP',
      image: 'https://i.pravatar.cc/150?img=15',
      rating: 5,
      text: 'Their tax planning services helped us save over ₹5 lakhs legally this year. The team is knowledgeable, always available, and provides actionable insights.',
      service: 'Income Tax Planning'
    },
    {
      name: 'Ananya Kumar',
      role: 'Entrepreneur',
      company: 'Fashion Hub',
      image: 'https://i.pravatar.cc/150?img=28',
      rating: 5,
      text: 'From FSSAI license to GST registration, they handled everything seamlessly. Quick responses, transparent pricing, and excellent support. Couldn\'t ask for more!',
      service: 'Business Licenses'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 max-w-7xl mx-auto">
        <SectionHeading subtitle="Hear from thousands of satisfied clients who trust us">
          What Our Clients Say
        </SectionHeading>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">4.9/5</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">10K+</div>
            <div className="text-sm text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">50K+</div>
            <div className="text-sm text-gray-600">Services Delivered</div>
          </div>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
            >
              {/* Service Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                  {testimonial.service}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg 
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Quote Icon */}
              <div className="mb-3">
                <svg className="w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed flex-grow">
                {testimonial.text}
              </p>

              {/* Author Info */}
              <div className="flex items-center pt-4 border-t border-gray-100">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-xs text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <div className="relative">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              {/* Service Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                  {testimonials[currentIndex].service}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <svg 
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Quote Icon */}
              <div className="mb-4">
                <svg className="w-10 h-10 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                {testimonials[currentIndex].text}
              </p>

              {/* Author Info */}
              <div className="flex items-center mb-6 pt-4 border-t border-gray-100">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="w-14 h-14 rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="font-bold text-gray-900 text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonials[currentIndex].role}
                  </div>
                  <div className="text-xs text-gray-500">
                    {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={prevTestimonial}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Dots Indicator */}
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-blue-600 w-8' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  aria-label="Next testimonial"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Join thousands of satisfied clients</p>
          {/* <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg">
            Get Your Free Consultation
          </button> */}
          <ClientButton className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg">
  Get Your Free Consultation
</ClientButton>
        </div>
      </div>
    </section>
  );
}