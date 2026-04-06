import { Link } from "react-router-dom";

export default function About() {
  const features = [
    {
      icon: "🤖",
      title: "Machine Learning Models",
      description:
        "Our AI models are trained on years of historical market data to predict portfolio behavior and risk metrics with high accuracy.",
    },
    {
      icon: "📊",
      title: "Monte Carlo Simulation",
      description:
        "We use advanced simulation techniques to model thousands of potential future scenarios and outcomes for your portfolio.",
    },
    {
      icon: "⚡",
      title: "Real-time Processing",
      description:
        "Analysis happens instantly. Upload your data and get results in seconds, not hours or days.",
    },
    {
      icon: "📈",
      title: "Advanced Risk Metrics",
      description:
        "Calculate volatility, correlation, Value at Risk (VaR), and other essential portfolio metrics automatically.",
    },
  ];

  const metrics = [
    { icon: "📊", title: "Portfolio Returns", detail: "Expected returns based on historical data and current allocations" },
    { icon: "📉", title: "Volatility & Risk", detail: "Standard deviation, downside risk, and Value at Risk calculations" },
    { icon: "🔗", title: "Asset Correlation", detail: "How assets move together and affect overall portfolio risk" },
    { icon: "🎯", title: "Scenario Analysis", detail: "Outcome projections using Monte Carlo simulations with thousands of scenarios" },
  ];

  const stats = [
    { value: "10M+", label: "Data Points Analyzed" },
    { value: "99%", label: "Accuracy Rate" },
    { value: "<1s", label: "Analysis Time" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-96 flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About PortfolioAI
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Advanced portfolio risk analysis powered by machine learning and financial expertise
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              🎯 Our Mission
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              PortfolioAI is dedicated to making sophisticated portfolio risk analysis accessible to everyone.
              We combine cutting-edge machine learning with financial expertise to provide actionable insights
              that help investors make better decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="card-elevated p-8 text-center group hover-lift"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  {stat.value}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              🔬 Our Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Leveraging the latest in AI and financial mathematics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="card p-8 group hover-lift"
              >
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
            ))}
          </div>
        </div>
      </section>

      {/* What We Analyze */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              📋 What We Analyze
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive metrics for complete portfolio understanding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className="card p-6 group hover-lift border-l-4 border-l-blue-600"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {metric.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {metric.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {metric.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              ✨ Why Choose PortfolioAI?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white text-xl">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Accuracy You Can Trust
                </h3>
                <p className="text-gray-600">
                  Our models achieve 99% accuracy through continuous learning and validation against real market data.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white text-xl">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Instant Analysis
                </h3>
                <p className="text-gray-600">
                  Get comprehensive portfolio analysis in under 1 second, not hours or days.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white text-xl">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Enterprise-Grade Security
                </h3>
                <p className="text-gray-600">
                  Your data is encrypted with AES-256 and never stored or shared with third parties.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white text-xl">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Expert Insights
                </h3>
                <p className="text-gray-600">
                  AI-powered recommendations backed by decades of financial market expertise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Analyze Your Portfolio?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Join thousands of investors using PortfolioAI for smarter portfolio management.
          </p>
          <Link
            to="/analyzer"
            className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Free Analysis
          </Link>
        </div>
      </section>
    </div>
  );
}
