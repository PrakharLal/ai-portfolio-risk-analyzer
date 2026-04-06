import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";

export default function Results() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResult = sessionStorage.getItem("analysisResult");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      navigate("/analyzer");
    }
  }, [navigate]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your analysis...</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: result.monte_carlo_sample.map((_, i) => i),
    datasets: [
      {
        label: "Monte Carlo Simulations",
        data: result.monte_carlo_sample,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
        fill: true,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12, weight: 500 },
        },
      },
      filler: {
        propagate: true,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const getRiskColor = (risk) => {
    if (risk === "HIGH RISK") return "text-red-600";
    if (risk === "MEDIUM RISK") return "text-amber-600";
    return "text-green-600";
  };

  const getRiskBgColor = (risk) => {
    if (risk === "HIGH RISK") return "from-red-50 to-red-100";
    if (risk === "MEDIUM RISK") return "from-amber-50 to-amber-100";
    return "from-green-50 to-green-100";
  };

  const getRiskBorder = (risk) => {
    if (risk === "HIGH RISK") return "border-red-200";
    if (risk === "MEDIUM RISK") return "border-amber-200";
    return "border-green-200";
  };

  const metrics = [
    {
      label: "Expected Return",
      value: `${parseFloat(result.portfolio_return).toFixed(2)}%`,
      icon: "📈",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Volatility",
      value: `${parseFloat(result.volatility).toFixed(2)}%`,
      icon: "📊",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Sharpe Ratio",
      value: (
        parseFloat(result.portfolio_return) / parseFloat(result.volatility)
      ).toFixed(2),
      icon: "⚖️",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span>📊</span>
            Portfolio Analysis Results
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive AI-powered risk assessment of your portfolio
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Return Card */}
          <div className="card-elevated p-8 hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">
                  Expected Return
                </p>
              </div>
              <span className="text-3xl">📈</span>
            </div>
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {parseFloat(result.portfolio_return).toFixed(2)}%
            </p>
            <p className="text-sm text-gray-500">Annual portfolio return</p>
          </div>

          {/* Volatility Card */}
          <div className="card-elevated p-8 hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">
                  Volatility (Risk)
                </p>
              </div>
              <span className="text-3xl">📊</span>
            </div>
            <p className="text-4xl font-bold text-purple-600 mb-2">
              {parseFloat(result.volatility).toFixed(2)}%
            </p>
            <p className="text-sm text-gray-500">Standard deviation</p>
          </div>

          {/* Risk Score Card */}
          <div
            className={`card-elevated p-8 hover-lift bg-gradient-to-br ${getRiskBgColor(
              result.risk_score
            )} border-2 ${getRiskBorder(result.risk_score)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">
                  Risk Level
                </p>
              </div>
              <span className="text-3xl">⚠️</span>
            </div>
            <p
              className={`text-4xl font-bold ${getRiskColor(
                result.risk_score
              )} mb-2`}
            >
              {result.risk_score}
            </p>
            <p className="text-sm text-gray-600">Overall assessment</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <div className="card-elevated p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>🎯</span>
                Monte Carlo Simulation Results
              </h2>
              <div className="h-96 mb-4">
                <Line data={chartData} options={chartOptions} />
              </div>
              <p className="text-sm text-gray-600 text-center">
                Distribution of potential portfolio outcomes from 1000 simulations
              </p>
            </div>
          </div>

          {/* Insights Section */}
          <div className="lg:col-span-1">
            <div className="card-elevated p-8 h-full flex flex-col">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>💡</span>
                AI Insights
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8 flex-grow">
                {result.explanation}
              </p>

              {/* Key Metrics Table */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">📋 Key Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 text-sm font-medium">Return:</span>
                    <span className="font-bold text-gray-900">
                      {parseFloat(result.portfolio_return).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 text-sm font-medium">Volatility:</span>
                    <span className="font-bold text-gray-900">
                      {parseFloat(result.volatility).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-gray-600 text-sm font-medium">Sharpe Ratio:</span>
                    <span className="font-bold text-blue-600">
                      {(parseFloat(result.portfolio_return) / parseFloat(result.volatility)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => navigate("/analyzer")}
                className="w-full mt-6 btn-primary"
              >
                Analyze Another Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* Monte Carlo Data Table */}
        <div className="card-elevated p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>📈</span>
            Simulation Data ({result.monte_carlo_sample.length} samples)
          </h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 p-6 bg-gradient-to-b from-gray-50 to-white max-h-96 overflow-y-auto">
              {result.monte_carlo_sample.map((val, i) => (
                <div
                  key={i}
                  className="p-3 bg-white border border-gray-200 rounded-lg text-center text-sm font-mono text-gray-700 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                >
                  <span className="text-blue-600 font-bold">
                    {parseFloat(val).toFixed(2)}
                  </span>
                  <span className="text-gray-500">%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center p-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-200/50">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Want to optimize your portfolio?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get personalized recommendations based on your risk profile and investment goals.
          </p>
          <button className="btn-primary">
            Get Portfolio Recommendations
          </button>
        </div>
      </div>
    </div>
  );
}
