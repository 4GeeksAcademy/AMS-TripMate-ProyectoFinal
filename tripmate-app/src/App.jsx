import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TripDetail from "./pages/TripDetail";
import Featuring from "./pages/Featuring";
import Contacts from "./pages/Contacts";
import CreateTrip from "./pages/CreateTrip";
import Login from "./pages/Login";
import About from "./pages/About";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Navbar />
      <main className="flex-1 w-full max-w-3xl mx-auto px-2 sm:px-4 py-4 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/featuring" element={<Featuring />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/trip/:id" element={<TripDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;