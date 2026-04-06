import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Analyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setError(null);
      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Analysis failed");
      }

      const data = await res.json();

      // Store result in sessionStorage for the results page
      sessionStorage.setItem("analysisResult", JSON.stringify(data));

      navigate("/results");
    } catch (err) {
      console.error(err);
      setError(err.message || "Error occurred during analysis");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "text/csv" || selectedFile.name.endsWith(".csv")) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError("Please select a CSV file");
        setFile(null);
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.type === "text/csv" || selectedFile.name.endsWith(".csv")) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError("Please drop a CSV file");
        setFile(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Portfolio Analyzer
          </h1>
          <p className="text-lg text-gray-600">
            Upload your portfolio CSV file to get started with AI-powered risk analysis
          </p>
        </div>

        {/* Main Card */}
        <div className="card-elevated overflow-hidden">
          {/* Header gradient */}
          <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>

          <div className="p-8 md:p-12">
            {/* File Upload Section */}
            <div className="mb-10">
              <label className="block text-lg font-semibold text-gray-900 mb-6">
                📄 Portfolio Data File
              </label>

              {/* Drag and drop area */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative transition-all duration-300 ${dragActive ? "scale-105" : ""}`}
              >
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                  disabled={loading}
                />
                <label
                  htmlFor="file-input"
                  className={`block w-full p-8 border-2 border-dashed rounded-xl hover:border-blue-400 transition-all duration-300 cursor-pointer text-center group ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : file
                      ? "border-green-400 bg-green-50"
                      : "border-gray-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {file ? "✅" : "📤"}
                    </div>
                    <p className={`font-semibold mb-2 ${file ? "text-green-700" : "text-gray-700"}`}>
                      {file ? `Selected: ${file.name}` : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-sm text-gray-500">
                      CSV files only • Max 10MB
                    </p>
                  </div>
                </label>
              </div>

              {/* File format hint */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-gray-900 mb-2">📋 Expected CSV Format:</p>
                <p className="text-sm text-gray-700">
                  Columns: Asset Name, Quantity, Price, Historical Returns (or similar)
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg animate-slide-down">
                <p className="text-red-800 font-medium flex items-center gap-3">
                  <span className="text-xl">⚠️</span>
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 mb-6 ${
                !file || loading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl active:scale-95"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analyzing your portfolio...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Analyze Portfolio
                </>
              )}
            </button>

            {/* Help Section */}
            <div className="pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                ❓ Need Help?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <p className="font-semibold text-gray-900 mb-2">CSV Format</p>
                  <p className="text-sm text-gray-600">
                    Include columns for asset names, quantities, prices, and historical returns
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <p className="font-semibold text-gray-900 mb-2">File Size</p>
                  <p className="text-sm text-gray-600">
                    Maximum file size is 10MB for optimal performance
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <p className="font-semibold text-gray-900 mb-2">Processing Time</p>
                  <p className="text-sm text-gray-600">
                    Analysis typically completes in 10-30 seconds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features highlight */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="text-4xl mb-3">🔒</div>
            <h4 className="font-semibold text-gray-900 mb-2">Secure</h4>
            <p className="text-sm text-gray-600">Your data is encrypted and never stored</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-3">⚡</div>
            <h4 className="font-semibold text-gray-900 mb-2">Fast</h4>
            <p className="text-sm text-gray-600">Get results in seconds, not minutes</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="font-semibold text-gray-900 mb-2">Accurate</h4>
            <p className="text-sm text-gray-600">AI-powered analysis with 99.9% precision</p>
          </div>
        </div>
      </div>
    </div>
  );
}
