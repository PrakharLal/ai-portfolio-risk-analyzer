import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// Scroll-Driven Cinematic Hero Component
function ScrollDrivenHero() {
  const [frameIndex, setFrameIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const totalFrames = 200;

  // Handle scroll for frame animation
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      const heroSection = heroRef.current;
      const heroRect = heroSection.getBoundingClientRect();
      const heroHeight = heroSection.offsetHeight;

      if (heroRect.bottom <= 0) {
        setFrameIndex(totalFrames - 1);
      } else if (heroRect.top > window.innerHeight) {
        setFrameIndex(0);
      } else {
        const visibleProgress = Math.max(0, window.innerHeight - heroRect.top) / (window.innerHeight + heroHeight);
        const clampedProgress = Math.min(1, visibleProgress);
        const newFrameIndex = Math.floor(clampedProgress * (totalFrames - 1));
        setFrameIndex(newFrameIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mouse parallax for floating elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      // Only track mouse within hero section
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.015;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.015;
        setMousePos({ x: moveX, y: moveY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Get frame number with padding
  const frameNum = String(frameIndex + 1).padStart(3, "0");

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Cinematic Background - Full Coverage */}
      <div className="absolute inset-0 z-0">
        <img
          src={`/hero_img/ezgif-frame-${frameNum}.jpg`}
          alt={`Portfolio Frame ${frameIndex}`}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
      </div>

      {/* Floating Decorative Elements - Top Left */}
      <div
        className="absolute top-20 left-10 w-32 md:w-40 floating-delayed pointer-events-none opacity-60 transition-transform duration-100"
        style={{
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
        }}
      >
        <div className="w-full h-40 bg-gradient-to-br from-blue-400/40 to-cyan-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Decorative Elements - Bottom Right */}
      <div
        className="absolute bottom-20 right-10 w-40 md:w-48 floating pointer-events-none opacity-60 transition-transform duration-100"
        style={{
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
        }}
      >
        <div className="w-full h-48 bg-gradient-to-br from-purple-400/40 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Background Text - Large Typography */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter opacity-10 text-white whitespace-nowrap">
          PORTFOLIO
        </h1>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white drop-shadow-lg">
          <span>Understand Your</span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Portfolio Risk
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-100 mb-10 leading-relaxed max-w-2xl drop-shadow-md">
          Advanced AI-powered portfolio analysis. Get actionable insights on risk, volatility, and potential returns using cutting-edge machine learning.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/analyzer"
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 hover:-translate-y-1"
          >
            Start Analysis
          </Link>
          <button className="px-10 py-4 border-2 border-white/80 hover:border-white text-white font-bold text-lg rounded-full transition-all duration-300 backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:-translate-y-1">
            Learn More
          </button>
        </div>
      </div>

      {/* Floating Badges - Bottom */}
      <div className="absolute bottom-24 left-0 right-0 z-20 flex justify-center gap-6 flex-wrap px-4">
        {["Fast", "Accurate", "Reliable"].map((text, idx) => (
          <div
            key={idx}
            className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-medium animate-float drop-shadow-lg"
            style={{ animationDelay: `${idx * 0.3}s` }}
          >
            {text}
          </div>
        ))}
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-white/5 to-white z-5"></div>
    </section>
  );
}

export default function Home() {
  const features = [
    {
      title: "AI-Powered Analysis",
      description: "Machine learning models analyze your portfolio in seconds",
      icon: "🤖",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Risk Assessment",
      description: "Comprehensive evaluation of portfolio volatility and risk",
      icon: "📊",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Monte Carlo Simulation",
      description: "Advanced simulations predict potential portfolio outcomes",
      icon: "📈",
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Real-time Processing",
      description: "Get instant insights from your portfolio data",
      icon: "⚡",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Upload Portfolio",
      description: "Upload your CSV file with portfolio data",
      icon: "📁",
    },
    {
      number: "2",
      title: "AI Analysis",
      description: "AI analyzes risk metrics and patterns",
      icon: "🔬",
    },
    {
      number: "3",
      title: "Get Insights",
      description: "Receive detailed risk assessment and recommendations",
      icon: "💡",
    },
  ];

  const stats = [
    { value: "1000+", label: "Portfolios Analyzed" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "AI Support" },
  ];

  return (
    <div className="min-h-screen">
      {/* Scroll-Driven Cinematic Hero */}
      <ScrollDrivenHero />

      {/* Features Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for professional portfolio risk analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative card p-8 hover:shadow-2xl hover:border-blue-200"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to portfolio insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>

            {steps.map((step, idx) => (
              <div
                key={idx}
                className="text-center relative hover-lift"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="relative inline-block mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl relative z-10 group hover:shadow-2xl transition-all duration-300">
                    {step.number}
                  </div>
                  <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-lg">{step.description}</p>
                <div className="text-4xl mt-4">{step.icon}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/analyzer"
              className="btn-primary inline-block"
            >
              Try Now
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-6xl md:text-7xl font-bold mb-4 group-hover:text-blue-200 transition-colors duration-300">
                  {stat.value}
                </div>
                <p className="text-xl text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Ready to Analyze Your Portfolio?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of investors using PortfolioAI to make smarter portfolio decisions.
          </p>
          <Link
            to="/analyzer"
            className="btn-primary inline-block"
          >
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  );
}
