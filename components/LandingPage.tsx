
import React, { useState, useEffect } from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden scroll-smooth">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-4 glass border-b border-slate-200/50 shadow-sm' : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 group-hover:rotate-12 transition-transform duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">WorkFlow Pro</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Features', 'Pricing', 'Resources'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-all relative group"
              >
                {item}
                {item === 'Resources' && (
                    <span className="absolute -top-3 -right-6 px-1.5 py-0.5 bg-indigo-100 text-indigo-600 text-[9px] font-black rounded-md uppercase tracking-tighter">New</span>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Log In</button>
            <button 
              onClick={onGetStarted}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-black hover:bg-indigo-600 transition-all shadow-xl active:scale-95 flex items-center gap-2 group"
            >
              Get Started
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-indigo-100 rounded-full text-indigo-600 text-[11px] font-black uppercase tracking-widest mb-10 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Version 2.0 Now Available
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-10">
            The platform for <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-indigo-600 bg-clip-text text-transparent italic">high-output teams.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto mb-14 leading-relaxed">
            Beautifully designed, exceptionally fast, and built for the modern workspace. Scalable from startups to enterprise.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl text-lg font-black hover:bg-indigo-700 transition-all shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] active:scale-95"
            >
              Start Free Trial
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl text-lg font-black hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2">
              <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Watch Video
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Overlay */}
      <section className="px-6 mb-32">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[40px] p-2 md:p-4 shadow-[0_50px_100px_-20px_rgba(79,70,229,0.3)] border-[12px] border-slate-800 animate-float relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[32px] pointer-events-none"></div>
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
            className="rounded-[28px] md:rounded-[32px] w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 opacity-90"
            alt="Dashboard Preview"
          />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Designed to help you ship.</h2>
            <p className="text-indigo-600 font-black uppercase tracking-[0.2em] text-[10px]">The WorkFlow Advantage</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { title: "Kanban Perfection", desc: "Drag, drop, and automate your workflow with our ultra-fast board system.", icon: "📋" },
              { title: "Real-time Sync", desc: "Never hit refresh again. Collaborate with your team in sub-500ms real-time.", icon: "⚡" },
              { title: "Smart Reports", desc: "Get AI-generated insights into team productivity and project health.", icon: "📈" }
            ].map((f, i) => (
              <div key={i} className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-xl shadow-slate-200/20 hover-scale cursor-default transition-all group">
                <div className="text-5xl mb-8 group-hover:scale-125 transition-transform duration-300 block">{f.icon}</div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-24 px-6 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <span className="text-2xl font-black tracking-tight">WorkFlow Pro</span>
            </div>
            <p className="text-slate-400 font-medium max-w-sm mb-10 leading-relaxed">Redefining project management for the modern era. Empowering 15,000+ teams worldwide to build better products.</p>
            <div className="flex gap-4">
               {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 bg-slate-800 rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer border border-slate-700 flex items-center justify-center">
                 <div className="w-4 h-4 bg-slate-600 rounded-sm"></div>
               </div>)}
            </div>
          </div>
          <div>
            <h4 className="font-black mb-8 uppercase tracking-widest text-[10px] text-indigo-400">Platform</h4>
            <div className="flex flex-col gap-5 text-sm font-bold text-slate-300">
              <a href="#" className="hover:text-white transition-colors">Product Roadmap</a>
              <a href="#" className="hover:text-white transition-colors">Security Infrastructure</a>
              <a href="#" className="hover:text-white transition-colors">API Documentation</a>
              <a href="#" className="hover:text-white transition-colors">Community Forum</a>
            </div>
          </div>
          <div>
            <h4 className="font-black mb-8 uppercase tracking-widest text-[10px] text-indigo-400">Company</h4>
            <div className="flex flex-col gap-5 text-sm font-bold text-slate-300">
              <a href="#" className="hover:text-white transition-colors">Our Mission</a>
              <a href="#" className="hover:text-white transition-colors">Customer Stories</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-bold text-slate-500 tracking-wide">© 2024 WorkFlow Pro Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Operational</span>
                </div>
            </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[60] w-14 h-14 glass border border-slate-200/50 rounded-2xl shadow-2xl flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:scale-110 active:scale-95 transition-all duration-500 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
        }`}
        aria-label="Back to Top"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};

export default LandingPage;
