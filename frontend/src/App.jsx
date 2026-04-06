import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Analyzer from "./pages/Analyzer";
import Results from "./pages/Results";
import About from "./pages/About";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route path="/results" element={<Results />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;