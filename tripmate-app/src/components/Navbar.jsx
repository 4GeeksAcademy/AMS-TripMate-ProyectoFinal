import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaSuitcaseRolling, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();
  const settingsRef = useRef();

  // Cierra el menú si haces click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-950/95 text-white shadow-xl border-b-4 border-yellow-400 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-extrabold text-2xl tracking-tight hover:text-yellow-400 transition"
          >
            <FaSuitcaseRolling className="text-yellow-400 text-3xl" />
            TripMate
          </Link>
          {/* Desktop menu */}
          <div className="hidden md:flex gap-8 items-center flex-1 ml-8">
            <Link to="/featuring" className="hover:text-yellow-400 transition font-semibold">
              Características
            </Link>
            <Link
              to="/about"
              className="hover:text-yellow-400 transition font-semibold"
            >
              About
            </Link>
            <Link to="/contacts" className="hover:text-yellow-400 transition font-semibold">
              Contacts
            </Link>
            {user && (
              <Link to="/profile" className="hover:text-yellow-400 transition font-semibold">
                Tus viajes
              </Link>
            )}
          </div>
          {/* Botones a la derecha */}
          <div className="hidden md:flex gap-3 items-center ml-8">
            <Link
              to="/create-trip"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold px-4 py-2 rounded-lg shadow transition"
            >
              Get Started
            </Link>
            {!user ? (
              <Link
                to="/login"
                className="border border-yellow-400 hover:bg-yellow-400 hover:text-gray-950 text-yellow-400 font-bold px-4 py-2 rounded-lg shadow transition"
              >
                Iniciar sesión
              </Link>
            ) : (
              <div className="relative" ref={settingsRef}>
                <button
                  className="border border-yellow-400 hover:bg-yellow-400 hover:text-gray-950 text-yellow-400 font-bold px-4 py-2 rounded-lg shadow transition flex items-center gap-2"
                  onClick={() => setSettingsOpen((v) => !v)}
                >
                  Ajustes
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {settingsOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10 text-gray-900">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-yellow-100"
                      onClick={() => {
                        setSettingsOpen(false);
                        navigate("/profile");
                      }}
                    >
                      Ajustes
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-yellow-100 text-red-600"
                      onClick={() => {
                        setSettingsOpen(false);
                        logout();
                        navigate("/");
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none ml-2"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
            ref={menuRef}
          >
            {open ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-gray-900/95 px-4 pb-4 border-b-4 border-yellow-400">
          <Link to="/featuring" className="block py-2 hover:text-yellow-400 font-semibold" onClick={() => setOpen(false)}>
            Características
          </Link>
          <Link
            to="/about"
            className="block py-2 hover:text-yellow-400 font-semibold"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link to="/contacts" className="block py-2 hover:text-yellow-400 font-semibold" onClick={() => setOpen(false)}>
            Contacts
          </Link>
          {user && (
            <Link
              to="/profile"
              className="block py-2 hover:text-yellow-400 font-semibold"
              onClick={() => setOpen(false)}
            >
              Tus viajes
            </Link>
          )}
          <Link
            to="/create-trip"
            className="block mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold px-4 py-2 rounded-lg shadow transition"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>
          {!user ? (
            <Link
              to="/login"
              className="block mt-2 border border-yellow-400 hover:bg-yellow-400 hover:text-gray-950 text-yellow-400 font-bold px-4 py-2 rounded-lg shadow transition"
              onClick={() => setOpen(false)}
            >
              Iniciar sesión
            </Link>
          ) : (
            <div className="relative mt-2">
              <button
                className="block w-full border border-yellow-400 hover:bg-yellow-400 hover:text-gray-950 text-yellow-400 font-bold px-4 py-2 rounded-lg shadow transition text-left"
                onClick={() => {
                  setOpen(false);
                  navigate("/profile");
                }}
              >
                Ajustes
              </button>
              <button
                className="block w-full border border-red-600 hover:bg-red-600 hover:text-white text-red-600 font-bold px-4 py-2 rounded-lg shadow transition text-left mt-1"
                onClick={() => {
                  setOpen(false);
                  logout();
                  navigate("/");
                }}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;