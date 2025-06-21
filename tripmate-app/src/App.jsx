import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TripDetail from "./pages/TripDetail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-blue-100">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/viajes/:id" element={<TripDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;