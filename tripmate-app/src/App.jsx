import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TripDetail from "./pages/TripDetail";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Navbar />
      <main className="flex-1 w-full max-w-3xl mx-auto px-2 sm:px-4 py-4 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trip/:id" element={<TripDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;