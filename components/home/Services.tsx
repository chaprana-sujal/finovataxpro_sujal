'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '../../data/serviceData';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-white mb-4">
        {children}
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
    </div>
  );
}

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function Card({ children, onClick, className = "" }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br from-slate-900/90 to-blue-900/90 backdrop-blur-md rounded-xl p-6 border border-cyan-400/20 shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}



// Map category names to icons (fallback if not in data)
const getCategoryIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('registration')) return '🏢';
  if (lowerName.includes('trademark') || lowerName.includes('ip')) return '™️';
  if (lowerName.includes('gst') || lowerName.includes('tax')) return '📋';
  if (lowerName.includes('compliance')) return '✅';
  if (lowerName.includes('legal')) return '⚖️';
  if (lowerName.includes('funding')) return '💰';
  return '📂';
};

export default function Services() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/services/category/${categoryId}`);
  };

  const handleContact = () => {
    router.push('/contact');
  }

  return (
    <section id="services" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Layered gradient waves */}
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

        {/* Floating particles */}
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

        {/* Overlapping circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10">
          <div className="absolute inset-0 border-4 border-cyan-400 rounded-full animate-ping-slow"></div>
          <div className="absolute inset-8 border-4 border-blue-400 rounded-full animate-ping-slow animation-delay-1000"></div>
          <div className="absolute inset-16 border-4 border-purple-400 rounded-full animate-ping-slow animation-delay-2000"></div>
        </div>

        {/* Subtle scanlines */}
        <div className="absolute inset-0 bg-scanlines opacity-5"></div>
      </div>

      {/* Content */}
      <div className="container px-4 max-w-7xl mx-auto relative z-10">
        <SectionHeading>Our Service Categories</SectionHeading>

        {/* Category Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="cursor-pointer group transform hover:-translate-y-2 transition-all duration-300"
            >
              <Card>
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-2xl mr-3 group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300">
                    {category.icon || getCategoryIcon(category.name)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-white group-hover:text-cyan-300 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {category.services?.length || 0} services available
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-300 mb-4 leading-relaxed line-clamp-3">
                  {category.description}
                </p>
                <button
                  suppressHydrationWarning
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-0.5"
                >
                  Explore Services →
                </button>
              </Card>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-slate-900/90 to-blue-900/90 backdrop-blur-md rounded-2xl p-8 border border-cyan-400/20 shadow-2xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-slate-300 mb-6">
              Our expert team is ready to help with custom solutions tailored to your needs.
            </p>

            {/* Buttons Container */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                suppressHydrationWarning
                onClick={() => {
                  const ctaSection = document.getElementById('cta-section');
                  if (ctaSection) {
                    ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    router.push('/contact');
                  }
                }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-0.5"
              >
                Contact Our Experts
              </button>
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
        .animate-gradient-shift { animation: gradient-shift 20s ease-in-out infinite; }
        .animate-blob { animation: blob 15s ease-in-out infinite; }
        .animate-particle-1 { animation: particle-1 15s ease-in-out infinite; }
        .animate-particle-2 { animation: particle-2 18s ease-in-out infinite; }
        .animate-particle-3 { animation: particle-3 20s ease-in-out infinite; }
        .animate-particle-4 { animation: particle-4 16s ease-in-out infinite; }
        .animate-particle-5 { animation: particle-5 22s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 6s ease-in-out infinite; }
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