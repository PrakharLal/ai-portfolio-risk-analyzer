export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Security", href: "#" },
    ],
    Company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ],
    Legal: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "Contact", href: "#" },
    ],
  };

  const socials = [
    { name: "Twitter", icon: "𝕏", href: "#" },
    { name: "LinkedIn", icon: "in", href: "#" },
    { name: "GitHub", icon: "⚙️", href: "#" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-950 text-gray-300 border-t border-slate-700/50 mt-20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <h3 className="text-xl font-bold text-white">PortfolioAI</h3>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Advanced portfolio risk analysis powered by AI. Make smarter investment decisions with data-driven insights.
            </p>
            <div className="flex space-x-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-blue-600 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 group"
                  title={social.name}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wide">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 group flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-slate-700/50 mb-8">
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-xl p-6 md:p-8">
            <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
              <span>📧</span>
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Get the latest insights on portfolio analysis and market trends.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-300 text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500">
            © {currentYear} PortfolioAI. All rights reserved. Built with ❤️ for investors.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
