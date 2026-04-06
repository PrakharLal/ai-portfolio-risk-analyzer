import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Upload file first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const chartData = result
    ? {
        labels: result.monte_carlo_sample.map((_, i) => i),
        datasets: [
          {
            label: "Monte Carlo Returns",
            data: result.monte_carlo_sample,
            borderColor: "rgb(59,130,246)",
            tension: 0.3,
          },
        ],
      }
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-96">
        <h1 className="text-xl font-bold mb-4">
          AI Portfolio Risk Analyzer 🚀
        </h1>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 w-full mb-4"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {result && (
          <div className="bg-gray-700 p-4 rounded mt-4">
            <p>
              <b>Return:</b> {result.portfolio_return}
            </p>
            <p>
              <b>Volatility:</b> {result.volatility}
            </p>
            <p>
              <b>Risk:</b>{" "}
              <span
                className={
                  result.risk_score === "HIGH RISK"
                    ? "text-red-400"
                    : "text-green-400"
                }
              >
                {result.risk_score}
              </span>
            </p>
            <p>
              <b>Explanation:</b> {result.explanation}
            </p>

            <p className="mt-3 font-bold">Monte Carlo Sample:</p>
            <div className="text-sm max-h-32 overflow-y-auto">
              {result.monte_carlo_sample.map((val, i) => (
                <div key={i}>{val}</div>
              ))}
            </div>

            <div className="mt-4">
              <Line data={chartData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;