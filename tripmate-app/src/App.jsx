import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TripDetail from "./pages/TripDetail";
import Featuring from "./pages/Featuring";
import Contacts from "./pages/Contacts";
import CreateTrip from "./pages/CreateTrip";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import About from "./pages/About";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
        <Navbar />
        <main className="flex-1 w-full max-w-3xl mx-auto px-2 sm:px-4 py-4 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/featuring" element={<Featuring />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Rutas protegidas */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-trip"
              element={
                <PrivateRoute>
                  <CreateTrip />
                </PrivateRoute>
              }
            />
            <Route
              path="/trip/:id"
              element={
                <PrivateRoute>
                  <TripDetail />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;