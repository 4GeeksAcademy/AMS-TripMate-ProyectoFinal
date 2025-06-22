import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSuitcaseRolling, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);

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
          </div>
          {/* Botones a la derecha */}
          <div className="hidden md:flex gap-3 items-center ml-8">
            <Link
              to="/create-trip"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold px-4 py-2 rounded-lg shadow transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border border-yellow-400 hover:bg-yellow-400 hover:text-gray-950 text-yellow-400 font-bold px-4 py-2 rounded-lg shadow transition"
            >
              Iniciar sesión
            </Link>
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none ml-2"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
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
          <Link
            to="/create-trip"
            className="block mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold px-4 py-2 rounded-lg shadow transition"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="block mt-2 border border-yellow-400 hover:bg-yellow-400 hover:text-gray-950 text-yellow-400 font-bold px-4 py-2 rounded-lg shadow transition"
            onClick={() => setOpen(false)}
          >
            Iniciar sesión
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;