import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "Analyzer", path: "/analyzer" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100"
          : "bg-white/80 backdrop-blur-sm border-b border-gray-100/50"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent hidden sm:inline">
              PortfolioAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative ${
                  isActive(link.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Action Button - Desktop */}
          <Link
            to="/analyzer"
            className="hidden md:block px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
          >
            Get Started
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                isOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-100 pt-4 animate-slide-down">
            {links.map((link, idx) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/analyzer"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg text-center hover:shadow-lg transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
