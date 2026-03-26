import React, { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// STOCKR - Premium Marketing Website v2
// Agency-quality design with dramatic 3D, parallax, and motion
// ═══════════════════════════════════════════════════════════════════════════════

const StockRPremium = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [loaded, setLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const containerRef = useRef(null);

  // Smooth scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? window.scrollY / docHeight : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.15, rootMargin: "-50px" }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loaded]);

  const features = [
    { 
      id: "scan",
      title: "AI Scanner",
      subtitle: "Point. Scan. Done.",
      desc: "Our computer vision AI identifies products instantly. No barcodes needed. Works with any product, any language, any condition.",
      color: "#14b8a6"
    },
    { 
      id: "predict",
      title: "Demand Prediction",
      subtitle: "Know before you run out.",
      desc: "Machine learning that analyzes your sales patterns, seasonal trends, and local events to predict exactly what you'll need.",
      color: "#22d3ee"
    },
    { 
      id: "alert",
      title: "Smart Alerts",
      subtitle: "Never miss a moment.",
      desc: "Real-time notifications for low stock, expiring products, price changes, and opportunities. Your business, always in your pocket.",
      color: "#a855f7"
    },
    { 
      id: "grow",
      title: "Growth Insights",
      subtitle: "Data that drives decisions.",
      desc: "Understand what sells, when it sells, and why. Actionable insights that help you grow revenue and cut waste.",
      color: "#f59e0b"
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-[#020810] text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');
        
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        html { 
          scroll-behavior: smooth;
          font-size: 16px;
        }
        
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        ::selection {
          background: rgba(20, 184, 166, 0.4);
          color: white;
        }
        
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #14b8a6; border-radius: 2px; }
        
        /* ═══════════════════════════════════════════════════════════════════ */
        /* TYPOGRAPHY */
        /* ═══════════════════════════════════════════════════════════════════ */
        
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        
        .text-balance { text-wrap: balance; }
        
        .headline-xl {
          font-size: clamp(3rem, 12vw, 10rem);
          line-height: 0.9;
          letter-spacing: -0.04em;
          font-weight: 700;
        }
        
        .headline-lg {
          font-size: clamp(2.5rem, 8vw, 6rem);
          line-height: 0.95;
          letter-spacing: -0.03em;
          font-weight: 700;
        }
        
        .headline-md {
          font-size: clamp(1.75rem, 5vw, 3.5rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
          font-weight: 600;
        }
        
        /* ═══════════════════════════════════════════════════════════════════ */
        /* ANIMATIONS */
        /* ═══════════════════════════════════════════════════════════════════ */
        
        @keyframes float {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          25% { transform: translate3d(10px, -20px, 0) rotate(1deg); }
          50% { transform: translate3d(-5px, -10px, 0) rotate(-0.5deg); }
          75% { transform: translate3d(-10px, -25px, 0) rotate(0.5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          25% { transform: translate3d(-15px, -15px, 0) rotate(-1deg); }
          50% { transform: translate3d(10px, -25px, 0) rotate(0.5deg); }
          75% { transform: translate3d(5px, -10px, 0) rotate(-0.5deg); }
        }
        
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 50% 50% 40% 60% / 40% 50% 60% 50%; }
          75% { border-radius: 40% 60% 50% 50% / 60% 40% 60% 40%; }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes scan-beam {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-left {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes reveal-text {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }
        
        @keyframes counter-tick {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes wave {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-10px) scaleY(0.95); }
        }
        
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        
        /* ═══════════════════════════════════════════════════════════════════ */
        /* ANIMATION CLASSES */
        /* ═══════════════════════════════════════════════════════════════════ */
        
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
        .animate-morph { animation: morph 20s ease-in-out infinite; }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 40s linear infinite; }
        
        /* Scroll-triggered animations */
        [data-animate] {
          opacity: 0;
          transform: translateY(50px);
          transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        [data-animate].in-view {
          opacity: 1;
          transform: translateY(0);
        }
        
        [data-animate="fade"] { transform: none; }
        [data-animate="scale"] { transform: scale(0.95); }
        [data-animate="scale"].in-view { transform: scale(1); }
        [data-animate="left"] { transform: translateX(-60px); }
        [data-animate="left"].in-view { transform: translateX(0); }
        [data-animate="right"] { transform: translateX(60px); }
        [data-animate="right"].in-view { transform: translateX(0); }
        
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }
        .delay-5 { transition-delay: 0.5s; }
        .delay-6 { transition-delay: 0.6s; }
        
        /* ═══════════════════════════════════════════════════════════════════ */
        /* EFFECTS */
        /* ═══════════════════════════════════════════════════════════════════ */
        
        .glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.04);
        }
        
        .glass-strong {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #14b8a6 0%, #22d3ee 50%, #14b8a6 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 5s ease infinite;
        }
        
        .gradient-text-warm {
          background: linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #f59e0b 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 5s ease infinite;
        }
        
        /* Noise texture */
        .noise::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0.02;
          pointer-events: none;
          z-index: 1;
        }
        
        /* Glow effects */
        .glow-teal {
          box-shadow: 0 0 60px rgba(20, 184, 166, 0.3),
                      0 0 120px rgba(20, 184, 166, 0.15);
        }
        
        .glow-cyan {
          box-shadow: 0 0 60px rgba(34, 211, 238, 0.3),
                      0 0 120px rgba(34, 211, 238, 0.15);
        }
        
        /* Button effects */
        .btn-primary {
          position: relative;
          background: linear-gradient(135deg, #14b8a6, #0d9488);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transition: left 0.6s ease;
        }
        
        .btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 20px 50px rgba(20, 184, 166, 0.35);
        }
        
        .btn-primary:hover::before {
          left: 100%;
        }
        
        /* Card 3D effect */
        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        .card-3d:hover {
          transform: perspective(1000px) rotateX(3deg) rotateY(-3deg) translateZ(10px);
        }
        
        /* Perspective container */
        .perspective-container {
          perspective: 2000px;
          transform-style: preserve-3d;
        }
        
        /* Phone device */
        .phone-device {
          transform-style: preserve-3d;
        }
        
        /* Link hover */
        .link-hover {
          position: relative;
        }
        
        .link-hover::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: currentColor;
          transition: width 0.3s ease;
        }
        
        .link-hover:hover::after {
          width: 100%;
        }
        
        /* Input focus */
        .input-premium:focus {
          outline: none;
          border-color: #14b8a6;
          box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.15);
        }
        
        /* Marquee */
        .marquee {
          display: flex;
          overflow: hidden;
          user-select: none;
        }
        
        .marquee-content {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        
        /* Progress bar */
        .progress-bar {
          transform-origin: left;
          transition: transform 0.3s ease;
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PROGRESS BAR */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-[100]">
        <div 
          className="h-full bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-500 progress-bar"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* BACKGROUND LAYERS */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Deep gradient base */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(20, 184, 166, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 100% 50%, rgba(34, 211, 238, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 0% 80%, rgba(168, 85, 247, 0.06) 0%, transparent 50%),
              linear-gradient(180deg, #020810 0%, #030a14 50%, #020810 100%)
            `
          }}
        />
        
        {/* Morphing orbs */}
        <div 
          className="absolute w-[800px] h-[800px] animate-morph animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 60%)',
            top: '-25%',
            right: '-15%',
            filter: 'blur(80px)',
            transform: `translate(${(mousePos.x - 0.5) * -40}px, ${(mousePos.y - 0.5) * -40 + scrollY * 0.1}px)`
          }}
        />
        
        <div 
          className="absolute w-[600px] h-[600px] animate-morph"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 60%)',
            bottom: '10%',
            left: '-10%',
            filter: 'blur(100px)',
            animationDelay: '5s',
            transform: `translate(${(mousePos.x - 0.5) * 30}px, ${(mousePos.y - 0.5) * 30 - scrollY * 0.05}px)`
          }}
        />
        
        {/* Grid pattern with mask */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 70%)'
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-teal-400/20"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* NAVIGATION */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrollY > 80 ? 'rgba(2, 8, 16, 0.9)' : 'transparent',
          backdropFilter: scrollY > 80 ? 'blur(30px)' : 'none',
          padding: scrollY > 80 ? '0.75rem 0' : '1.25rem 0'
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              {/* StockR Logo - Accurate to actual branding */}
              <svg width="36" height="36" viewBox="0 0 100 100" fill="none" className="transition-all duration-500 group-hover:scale-105">
                <defs>
                  <linearGradient id="logoGradNav1" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4b5563" />
                    <stop offset="50%" stopColor="#9ca3af" />
                    <stop offset="100%" stopColor="#d1d5db" />
                  </linearGradient>
                  <linearGradient id="logoGradNav2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6b7280" />
                    <stop offset="100%" stopColor="#374151" />
                  </linearGradient>
                </defs>
                {/* Box - rotated square with 3D effect */}
                <g transform="rotate(45 50 50)">
                  <rect x="22" y="22" width="56" height="56" fill="url(#logoGradNav2)" />
                  <rect x="18" y="18" width="56" height="56" fill="url(#logoGradNav1)" />
                </g>
                {/* Arrow going up-right */}
                <path d="M38 62 L62 38" stroke="#020810" strokeWidth="6" strokeLinecap="round" />
                <path d="M48 38 L62 38 L62 52" stroke="#020810" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-teal-500/20" />
            </div>
            <span className="text-white font-semibold text-xl tracking-tight" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>stockr</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {['Mission', 'Features', 'Impact', 'Global'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium link-hover"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium link-hover">
              Sign In
            </a>
            <button className="btn-primary px-6 py-3 rounded-full text-sm font-semibold text-[#020810]">
              Get Early Access
            </button>
          </div>

          {/* Mobile Menu */}
          <button 
            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="relative w-6 h-5">
              <span 
                className={`absolute w-full h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`}
              />
              <span 
                className={`absolute top-1/2 -translate-y-1/2 w-full h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : 'opacity-100'}`}
              />
              <span 
                className={`absolute w-full h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <div 
          className={`lg:hidden absolute top-full left-0 right-0 glass-strong transition-all duration-500 ${
            menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-6 py-8 space-y-6">
            {['Mission', 'Features', 'Impact', 'Global'].map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-2xl text-gray-300 hover:text-white transition-colors font-display"
                onClick={() => setMenuOpen(false)}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {item}
              </a>
            ))}
            <button className="btn-primary w-full py-4 rounded-full font-semibold text-[#020810] mt-4">
              Get Early Access
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 noise overflow-hidden">
        {/* Hero content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            {/* Left: Text */}
            <div className="order-2 lg:order-1">
              {/* Badge */}
              <div 
                className={`inline-flex items-center gap-3 mb-10 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-teal-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
                  </span>
                  <span className="text-teal-400 text-sm font-medium">AI-Powered Inventory Intelligence</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 
                className={`headline-xl font-display text-white mb-8 transition-all duration-1000 delay-150 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              >
                <span className="block">Waste</span>
                <span className="block gradient-text">nothing.</span>
              </h1>
              
              <h2 
                className={`headline-md font-display text-gray-400 mb-10 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              >
                Miss nothing. <span className="text-white">Grow everything.</span>
              </h2>

              {/* Description */}
              <p 
                className={`text-xl lg:text-2xl text-gray-500 mb-12 max-w-xl leading-relaxed font-body transition-all duration-1000 delay-450 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              >
                Smart inventory management that helps small businesses reduce waste, 
                capture every sale, and grow sustainably.
              </p>

              {/* CTA */}
              <div 
                className={`flex flex-col sm:flex-row gap-4 mb-16 transition-all duration-1000 delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              >
                <button className="btn-primary px-10 py-5 rounded-full text-lg font-semibold text-[#020810] flex items-center justify-center gap-3">
                  Start Free
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="group px-10 py-5 rounded-full text-lg font-medium text-white border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all flex items-center justify-center gap-3">
                  <span className="relative w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors overflow-hidden">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    {/* Ripple effect */}
                    <span className="absolute inset-0 rounded-full border border-white/20 animate-[ripple_2s_ease-out_infinite]" />
                  </span>
                  Watch Story
                </button>
              </div>

              {/* Social Proof */}
              <div 
                className={`flex flex-wrap items-center gap-8 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {['👨🏾‍💼', '👩🏻‍💼', '👨🏽‍💼', '👩🏼‍💼', '👨🏿‍💼'].map((emoji, i) => (
                      <div 
                        key={i} 
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-[#020810] flex items-center justify-center text-lg shadow-lg"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">10,000+</p>
                    <p className="text-gray-500 text-xs">businesses</p>
                  </div>
                </div>
                
                <div className="hidden sm:block h-10 w-px bg-white/10" />
                
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">4.9/5</span>
                </div>
              </div>
            </div>

            {/* Right: Realistic iPhone */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end perspective-container">
              <div 
                className={`relative phone-device transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{
                  transform: `perspective(2000px) rotateY(${(mousePos.x - 0.5) * -8}deg) rotateX(${(mousePos.y - 0.5) * 8}deg)`
                }}
              >
                {/* Glow behind phone */}
                <div 
                  className="absolute inset-0 rounded-[60px] animate-pulse-glow"
                  style={{
                    background: 'radial-gradient(circle at 30% 20%, rgba(20, 184, 166, 0.4) 0%, transparent 50%)',
                    filter: 'blur(60px)',
                    transform: 'scale(1.4) translateZ(-100px)'
                  }}
                />

                {/* iPhone Frame */}
                <div 
                  className="relative w-[280px] md:w-[320px] animate-float"
                  style={{ animationDuration: '6s' }}
                >
                  {/* Titanium frame */}
                  <div 
                    className="relative rounded-[55px] p-[3px]"
                    style={{
                      background: 'linear-gradient(145deg, #3a3a3c 0%, #1c1c1e 50%, #2c2c2e 100%)',
                      boxShadow: `
                        0 50px 100px -20px rgba(0,0,0,0.7),
                        0 30px 60px -15px rgba(0,0,0,0.5),
                        inset 0 1px 0 rgba(255,255,255,0.1),
                        inset 0 -1px 0 rgba(0,0,0,0.3)
                      `
                    }}
                  >
                    {/* Inner bezel */}
                    <div 
                      className="rounded-[52px] p-[2px]"
                      style={{ background: '#000' }}
                    >
                      {/* Screen */}
                      <div 
                        className="rounded-[50px] overflow-hidden relative"
                        style={{ 
                          aspectRatio: '9/19.5',
                          background: 'linear-gradient(165deg, #0a1628 0%, #06101a 50%, #030810 100%)'
                        }}
                      >
                        {/* Dynamic Island */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full flex items-center justify-center z-10">
                          <div className="w-3 h-3 rounded-full bg-[#1a1a1a] mr-8" />
                        </div>

                        {/* Screen Content - StockR Logo */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          {/* Subtle radial glow */}
                          <div 
                            className="absolute w-64 h-64 rounded-full"
                            style={{
                              background: 'radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, transparent 60%)',
                              filter: 'blur(30px)'
                            }}
                          />
                          
                          {/* StockR Logo - Accurate Recreation */}
                          <div className="relative flex flex-col items-center gap-5">
                            <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
                              <defs>
                                <linearGradient id="phoneLogo1" x1="0%" y1="100%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#4b5563" />
                                  <stop offset="50%" stopColor="#9ca3af" />
                                  <stop offset="100%" stopColor="#d1d5db" />
                                </linearGradient>
                                <linearGradient id="phoneLogo2" x1="100%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="#6b7280" />
                                  <stop offset="100%" stopColor="#374151" />
                                </linearGradient>
                              </defs>
                              {/* Box - rotated square with 3D effect */}
                              <g transform="rotate(45 50 50)">
                                {/* Back face */}
                                <rect x="22" y="22" width="56" height="56" fill="url(#phoneLogo2)" />
                                {/* Front face */}
                                <rect x="18" y="18" width="56" height="56" fill="url(#phoneLogo1)" />
                              </g>
                              {/* Arrow going up-right */}
                              <path 
                                d="M38 62 L62 38" 
                                stroke="#0a1628" 
                                strokeWidth="6" 
                                strokeLinecap="round"
                              />
                              <path 
                                d="M48 38 L62 38 L62 52" 
                                stroke="#0a1628" 
                                strokeWidth="6" 
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                              />
                            </svg>
                            <span 
                              className="text-white font-semibold text-3xl tracking-tight"
                              style={{ fontFamily: "'Nunito', 'Poppins', sans-serif", fontWeight: 600 }}
                            >
                              stockr
                            </span>
                          </div>
                        </div>

                        {/* Subtle grid overlay */}
                        <div 
                          className="absolute inset-0 opacity-[0.015]"
                          style={{
                            backgroundImage: `
                              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
                            `,
                            backgroundSize: '40px 40px'
                          }}
                        />

                        {/* Home indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Side buttons */}
                  <div className="absolute -left-[2px] top-[120px] w-[3px] h-8 bg-[#2c2c2e] rounded-l-sm" />
                  <div className="absolute -left-[2px] top-[170px] w-[3px] h-14 bg-[#2c2c2e] rounded-l-sm" />
                  <div className="absolute -left-[2px] top-[230px] w-[3px] h-14 bg-[#2c2c2e] rounded-l-sm" />
                  <div className="absolute -right-[2px] top-[180px] w-[3px] h-20 bg-[#2c2c2e] rounded-r-sm" />
                </div>

                {/* Floating elements */}
                <div 
                  className="absolute -right-6 top-[25%] glass-strong rounded-2xl p-4 shadow-2xl border border-teal-500/20 animate-float-delayed"
                  style={{ animationDuration: '5s' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#14b8a6">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">AI-Powered</p>
                      <p className="text-teal-400 text-xs">Smart Inventory</p>
                    </div>
                  </div>
                </div>

                <div 
                  className="absolute -left-8 bottom-[35%] glass-strong rounded-2xl p-4 shadow-2xl border border-cyan-500/20 animate-float"
                  style={{ animationDuration: '7s' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#22d3ee">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">50+ Countries</p>
                      <p className="text-cyan-400 text-xs">Global Reach</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-gray-600 text-[10px] tracking-[0.3em] uppercase font-medium">Scroll</span>
          <div className="w-5 h-9 rounded-full border border-gray-700/50 flex items-start justify-center p-1.5">
            <div className="w-1 h-2.5 bg-teal-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PROBLEM STATEMENT */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section id="mission" className="relative py-32 lg:py-48 noise overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Big stat */}
          <div className="mb-24" data-animate>
            <p className="text-teal-400 text-sm font-semibold tracking-[0.3em] uppercase mb-8 font-body">The Problem</p>
            <h2 className="headline-lg font-display text-balance max-w-5xl">
              <span className="text-gray-600">Every year,</span>{" "}
              <span className="gradient-text-warm">$1 trillion</span>{" "}
              <span className="text-gray-600">worth of products are wasted due to poor inventory management.</span>
            </h2>
          </div>

          {/* Stats row */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
            {[
              {
                stat: "40%",
                label: "of perishables lost",
                desc: "In developing markets, nearly half of food products never reach consumers — they expire, spoil, or get discarded.",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" strokeLinecap="round" />
                  </svg>
                )
              },
              {
                stat: "15+",
                label: "hours wasted weekly",
                desc: "Shop owners spend over 15 hours every week on manual counting, spreadsheets, and inventory guesswork.",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" strokeLinecap="round" />
                  </svg>
                )
              },
              {
                stat: "£163B",
                label: "lost annually",
                desc: "Small retailers worldwide lose hundreds of billions every year to stockouts, overstocking, and inefficiency.",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              }
            ].map((item, i) => (
              <div 
                key={i}
                data-animate
                className={`relative glass rounded-3xl p-10 card-3d overflow-hidden delay-${i + 1}`}
              >
                {/* Gradient corner */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-500/10 to-transparent rounded-bl-full" />
                
                <div className="relative z-10">
                  <div className="text-teal-400 mb-6 opacity-60">
                    {item.icon}
                  </div>
                  <p 
                    className="text-6xl lg:text-7xl font-bold text-white mb-2 font-display"
                  >
                    {item.stat}
                  </p>
                  <p className="text-teal-400 font-semibold text-lg mb-4">{item.label}</p>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* FEATURES SECTION */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section id="features" className="relative py-32 lg:py-48 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-20" data-animate>
            <p className="text-teal-400 text-sm font-semibold tracking-[0.3em] uppercase mb-6 font-body">The Solution</p>
            <h2 className="headline-lg font-display text-white mb-8">
              Intelligence that works <span className="gradient-text">for you</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              AI-powered features that automate the hard work, so you can focus on growing your business.
            </p>
          </div>

          {/* Feature showcase */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Feature cards */}
            <div className="space-y-4">
              {features.map((feature, i) => (
                <div
                  key={i}
                  data-animate
                  className={`relative rounded-3xl p-8 cursor-pointer transition-all duration-500 overflow-hidden delay-${i + 1} ${
                    activeSlide === i 
                      ? 'glass-strong border border-white/10' 
                      : 'hover:bg-white/[0.02]'
                  }`}
                  onClick={() => setActiveSlide(i)}
                >
                  {/* Active indicator */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-full transition-all duration-500"
                    style={{ 
                      background: activeSlide === i ? feature.color : 'transparent'
                    }}
                  />
                  
                  <div className="relative z-10 flex items-start gap-6">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500"
                      style={{ 
                        background: activeSlide === i 
                          ? `linear-gradient(135deg, ${feature.color}30, ${feature.color}10)`
                          : 'rgba(255,255,255,0.05)'
                      }}
                    >
                      {feature.id === 'scan' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={activeSlide === i ? feature.color : '#6b7280'} strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <path d="M7 12h10M12 7v10" strokeLinecap="round" />
                        </svg>
                      )}
                      {feature.id === 'predict' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={activeSlide === i ? feature.color : '#6b7280'} strokeWidth="1.5">
                          <path d="M3 3v18h18" strokeLinecap="round" />
                          <path d="M7 14l4-4 4 4 5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {feature.id === 'alert' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={activeSlide === i ? feature.color : '#6b7280'} strokeWidth="1.5">
                          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" />
                        </svg>
                      )}
                      {feature.id === 'grow' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={activeSlide === i ? feature.color : '#6b7280'} strokeWidth="1.5">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                    
                    <div>
                      <h3 className={`text-xl font-bold mb-1 font-display transition-colors duration-300 ${activeSlide === i ? 'text-white' : 'text-gray-400'}`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm font-medium mb-2 transition-colors duration-300`} style={{ color: activeSlide === i ? feature.color : '#6b7280' }}>
                        {feature.subtitle}
                      </p>
                      <p className={`text-gray-500 leading-relaxed transition-all duration-500 ${activeSlide === i ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature visual */}
            <div className="relative" data-animate="scale">
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Glow */}
                <div 
                  className="absolute inset-0 rounded-3xl animate-pulse-glow transition-colors duration-500"
                  style={{
                    background: `radial-gradient(circle, ${features[activeSlide].color}20 0%, transparent 60%)`,
                    filter: 'blur(60px)'
                  }}
                />
                
                {/* Main visual */}
                <div className="relative w-full h-full glass rounded-3xl overflow-hidden border border-white/5">
                  {/* Scanner visual */}
                  {activeSlide === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                      <div className="relative w-full h-full rounded-2xl border-2 border-dashed border-teal-500/30 overflow-hidden">
                        {/* Corners */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-teal-400 rounded-tl-xl" />
                        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-teal-400 rounded-tr-xl" />
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-teal-400 rounded-bl-xl" />
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-teal-400 rounded-br-xl" />
                        
                        {/* Scan line */}
                        <div 
                          className="absolute left-4 right-4 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent rounded-full shadow-lg shadow-teal-400/50"
                          style={{ animation: 'scan-beam 2s ease-in-out infinite' }}
                        />
                        
                        {/* Product */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-8xl">🥤</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Chart visual */}
                  {activeSlide === 1 && (
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <svg viewBox="0 0 200 120" className="w-full h-full">
                        {/* Grid */}
                        {[0,1,2,3,4].map(i => (
                          <line key={i} x1="0" y1={i * 30} x2="200" y2={i * 30} stroke="rgba(255,255,255,0.05)" />
                        ))}
                        {/* Historical line */}
                        <path 
                          d="M0,100 Q30,80 60,85 T120,70" 
                          fill="none" 
                          stroke="#22d3ee" 
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        {/* Prediction line */}
                        <path 
                          d="M120,70 Q150,50 180,30" 
                          fill="none" 
                          stroke="#22d3ee" 
                          strokeWidth="3"
                          strokeDasharray="8 4"
                          strokeLinecap="round"
                          opacity="0.6"
                        />
                        {/* Dots */}
                        <circle cx="60" cy="85" r="6" fill="#22d3ee" />
                        <circle cx="120" cy="70" r="8" fill="#22d3ee">
                          <animate attributeName="r" values="8;12;8" dur="1s" repeatCount="indefinite" />
                        </circle>
                        {/* Label */}
                        <text x="125" y="55" fill="#22d3ee" fontSize="10" fontWeight="600">Predicted</text>
                      </svg>
                    </div>
                  )}
                  
                  {/* Alerts visual */}
                  {activeSlide === 2 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 gap-4">
                      {[
                        { text: "Low stock: Rice (12 left)", color: "#f59e0b", time: "2m ago" },
                        { text: "Expiring: Milk in 2 days", color: "#ef4444", time: "5m ago" },
                        { text: "Restocked: Cooking Oil", color: "#22c55e", time: "12m ago" },
                      ].map((alert, i) => (
                        <div 
                          key={i}
                          className="w-full glass rounded-xl p-4 border-l-2 transform transition-all duration-500"
                          style={{ 
                            borderColor: alert.color,
                            animationDelay: `${i * 0.2}s`,
                            animation: 'fade-up 0.6s ease forwards'
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-white text-sm font-medium">{alert.text}</p>
                            <span className="text-gray-500 text-xs">{alert.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Insights visual */}
                  {activeSlide === 3 && (
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="w-full space-y-6">
                        {[
                          { label: "Best Seller", value: "Bread Loaf", growth: "+34%" },
                          { label: "Peak Hours", value: "4-6 PM", growth: "45% sales" },
                          { label: "Profit Margin", value: "23.5%", growth: "+2.1%" },
                        ].map((insight, i) => (
                          <div key={i} className="glass rounded-xl p-4">
                            <p className="text-gray-500 text-xs mb-1">{insight.label}</p>
                            <div className="flex items-end justify-between">
                              <p className="text-white text-xl font-bold font-display">{insight.value}</p>
                              <span className="text-amber-400 text-sm font-semibold">{insight.growth}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* IMPACT SECTION */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section id="impact" className="relative py-32 lg:py-48 noise overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left content */}
            <div>
              <div data-animate>
                <p className="text-teal-400 text-sm font-semibold tracking-[0.3em] uppercase mb-6 font-body">Our Impact</p>
                <h2 className="headline-lg font-display text-white mb-8">
                  Better inventory.<br />
                  <span className="gradient-text">Better world.</span>
                </h2>
                <p className="text-xl text-gray-500 mb-10 leading-relaxed">
                  When businesses waste less, everyone wins. Less food in landfills. 
                  More products reaching people who need them. That's the future we're building.
                </p>
              </div>

              {/* Charity card */}
              <div data-animate className="delay-2">
                <div className="glass rounded-3xl p-8 border border-orange-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
                  <div className="relative z-10 flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-3xl flex-shrink-0">
                      🤝
                    </div>
                    <div>
                      <p className="text-white font-bold text-xl mb-2 font-display">1% for the Planet</p>
                      <p className="text-gray-400 leading-relaxed">
                        We donate 1% of all revenue to <span className="text-orange-400 font-semibold">Action Against Hunger</span>, 
                        supporting communities in 50+ countries where food insecurity and waste coexist.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right stats grid */}
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {[
                { value: "40", suffix: "%", label: "Less Waste", desc: "Average reduction" },
                { value: "10K", suffix: "+", label: "Businesses", desc: "Trust us daily" },
                { value: "50", suffix: "+", label: "Countries", desc: "Global reach" },
                { value: "2M", suffix: "+", label: "Products", desc: "Tracked daily" }
              ].map((stat, i) => (
                <div 
                  key={i}
                  data-animate
                  className={`glass rounded-3xl p-8 text-center card-3d delay-${i + 1}`}
                >
                  <p className="text-5xl lg:text-6xl font-bold gradient-text mb-2 font-display">
                    {stat.value}<span className="text-3xl">{stat.suffix}</span>
                  </p>
                  <p className="text-white font-semibold mb-1">{stat.label}</p>
                  <p className="text-gray-500 text-sm">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* GLOBAL SECTION */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section id="global" className="relative py-32 lg:py-48 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-20" data-animate>
            <p className="text-teal-400 text-sm font-semibold tracking-[0.3em] uppercase mb-6 font-body">Global Reach</p>
            <h2 className="headline-lg font-display text-white mb-8">
              From corner shops to <span className="gradient-text">continents</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Built for businesses everywhere. Available in 11 languages, supporting 25+ currencies.
            </p>
          </div>

          {/* Globe visualization */}
          <div className="relative h-[500px] lg:h-[600px] mb-20" data-animate="scale">
            {/* Globe */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]">
                {/* Glow */}
                <div 
                  className="absolute inset-0 rounded-full animate-pulse-glow"
                  style={{
                    background: 'radial-gradient(circle, rgba(20, 184, 166, 0.2) 0%, transparent 60%)',
                    filter: 'blur(60px)'
                  }}
                />
                
                {/* Globe rings */}
                <svg viewBox="0 0 400 400" className="w-full h-full animate-spin-slow">
                  <defs>
                    <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  {/* Outer ring */}
                  <circle cx="200" cy="200" r="190" fill="none" stroke="url(#globeGrad)" strokeWidth="1" />
                  {/* Latitude lines */}
                  <ellipse cx="200" cy="200" rx="190" ry="70" fill="none" stroke="rgba(20,184,166,0.15)" strokeWidth="0.5" />
                  <ellipse cx="200" cy="200" rx="190" ry="140" fill="none" stroke="rgba(20,184,166,0.1)" strokeWidth="0.5" />
                  {/* Longitude lines */}
                  <ellipse cx="200" cy="200" rx="70" ry="190" fill="none" stroke="rgba(20,184,166,0.15)" strokeWidth="0.5" />
                  <ellipse cx="200" cy="200" rx="140" ry="190" fill="none" stroke="rgba(20,184,166,0.1)" strokeWidth="0.5" />
                </svg>

                {/* City dots */}
                {[
                  { name: "Mumbai", x: "65%", y: "45%", delay: 0 },
                  { name: "Lagos", x: "40%", y: "55%", delay: 0.5 },
                  { name: "Manila", x: "75%", y: "48%", delay: 1 },
                  { name: "London", x: "45%", y: "30%", delay: 1.5 },
                  { name: "Dubai", x: "55%", y: "42%", delay: 2 },
                  { name: "Jakarta", x: "72%", y: "58%", delay: 2.5 },
                ].map((city, i) => (
                  <div
                    key={i}
                    className="absolute"
                    style={{ left: city.x, top: city.y }}
                  >
                    {/* Pulse */}
                    <div 
                      className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-400/50"
                      style={{ animation: `ripple 2s ease-out infinite ${city.delay}s` }}
                    />
                    {/* Dot */}
                    <div className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400 shadow-lg shadow-teal-400/50" />
                    {/* Label */}
                    <div 
                      className="absolute left-4 top-1/2 -translate-y-1/2 glass rounded-full px-3 py-1 whitespace-nowrap"
                      style={{ animationDelay: `${city.delay}s` }}
                    >
                      <span className="text-white text-xs font-medium">{city.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🌐", title: "11 Languages", desc: "English, Hindi, Urdu, Arabic, Bengali, Tagalog, Bahasa, Mandarin & more" },
              { icon: "💱", title: "25+ Currencies", desc: "GBP, USD, EUR, INR, PKR, PHP, AED, MYR, IDR and many more" },
              { icon: "📱", title: "Works Offline", desc: "Full functionality without internet. Syncs when connected." }
            ].map((item, i) => (
              <div 
                key={i}
                data-animate
                className={`glass rounded-3xl p-8 text-center card-3d delay-${i + 1}`}
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-bold text-white mb-2 font-display">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TESTIMONIALS */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 lg:py-48 noise overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-20" data-animate>
            <p className="text-teal-400 text-sm font-semibold tracking-[0.3em] uppercase mb-6 font-body">Testimonials</p>
            <h2 className="headline-lg font-display text-white">
              Trusted by <span className="gradient-text">thousands</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Grocery Store Owner",
                location: "Mumbai, India",
                text: "StockR reduced my waste by 35% in the first month. The AI predictions are incredibly accurate — it's like having a business partner who never sleeps.",
                avatar: "👩🏽"
              },
              {
                name: "Ahmed Khan",
                role: "Pharmacy Owner",
                location: "Karachi, Pakistan",
                text: "I used to spend 4 hours daily on inventory. Now it's 20 minutes. StockR didn't just save time — it gave me my life back.",
                avatar: "👨🏽"
              },
              {
                name: "Maria Santos",
                role: "Mini Mart Owner",
                location: "Manila, Philippines",
                text: "The offline mode is perfect for our area. Even when internet goes down, my business keeps running. That's real reliability.",
                avatar: "👩🏻"
              }
            ].map((t, i) => (
              <div 
                key={i}
                data-animate
                className={`glass rounded-3xl p-8 lg:p-10 card-3d delay-${i + 1}`}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="20" height="20" viewBox="0 0 24 24" fill="#fbbf24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8">"{t.text}"</p>
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-2xl shadow-lg shadow-teal-500/20">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{t.name}</p>
                    <p className="text-gray-500 text-sm">{t.role}</p>
                    <p className="text-gray-600 text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* FINAL CTA */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 lg:py-48 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div 
            data-animate="scale"
            className="relative glass-strong rounded-[40px] p-12 md:p-20 text-center overflow-hidden"
          >
            {/* Background glow */}
            <div 
              className="absolute inset-0 animate-pulse-glow"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(20, 184, 166, 0.2) 0%, transparent 60%)'
              }}
            />
            
            <div className="relative z-10">
              <h2 className="headline-md font-display text-white mb-8">
                Ready to waste less and <span className="gradient-text">grow more?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Join thousands of businesses already transforming their inventory management. 
                Start free today.
              </p>

              {/* Email form */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-premium flex-1 px-6 py-5 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-gray-500 transition-all"
                />
                <button className="btn-primary px-10 py-5 rounded-full font-semibold text-[#020810] whitespace-nowrap">
                  Get Early Access
                </button>
              </div>

              <p className="text-gray-500 text-sm">
                Free 14-day trial • No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* FOOTER */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-white/5 py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-6 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
                  <defs>
                    <linearGradient id="footerLogo1" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4b5563" />
                      <stop offset="50%" stopColor="#9ca3af" />
                      <stop offset="100%" stopColor="#d1d5db" />
                    </linearGradient>
                    <linearGradient id="footerLogo2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6b7280" />
                      <stop offset="100%" stopColor="#374151" />
                    </linearGradient>
                  </defs>
                  <g transform="rotate(45 50 50)">
                    <rect x="22" y="22" width="56" height="56" fill="url(#footerLogo2)" />
                    <rect x="18" y="18" width="56" height="56" fill="url(#footerLogo1)" />
                  </g>
                  <path d="M38 62 L62 38" stroke="#020810" strokeWidth="6" strokeLinecap="round" />
                  <path d="M48 38 L62 38 L62 52" stroke="#020810" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <span className="text-white font-semibold text-xl" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>stockr</span>
              </div>
              <p className="text-gray-500 mb-6 max-w-xs text-sm leading-relaxed">
                AI-powered inventory management for businesses worldwide. 
                Waste nothing. Miss nothing. Grow everything.
              </p>
              <div className="flex gap-3">
                {['twitter', 'linkedin', 'instagram'].map(s => (
                  <a key={s} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:bg-white/10 hover:text-white transition-all">
                    {s === 'twitter' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>}
                    {s === 'linkedin' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" /></svg>}
                    {s === 'instagram' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" /></svg>}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog'] },
              { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
              { title: 'Resources', links: ['Blog', 'Help Center', 'Community', 'API'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-white font-semibold mb-4 text-sm">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm link-hover">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2026 StockR App Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-600">Proudly supporting</span>
              <a href="https://www.actionagainsthunger.org" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 font-medium transition-colors link-hover">
                Action Against Hunger
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StockRPremium;
