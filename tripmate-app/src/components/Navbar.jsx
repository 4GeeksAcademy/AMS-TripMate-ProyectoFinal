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
          <Link to="/" className="flex items-center gap-2 font-extrabold text-2xl tracking-tight hover:text-yellow-400 transition">
            <FaSuitcaseRolling className="text-yellow-400 text-3xl" />
            TripMate
          </Link>
          {/* Desktop menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link to="/" className="hover:text-yellow-400 transition font-semibold">Inicio</Link>
            <Link to="/#viajes" className="hover:text-yellow-400 transition font-semibold">Mis viajes</Link>
            <Link to="/#contacto" className="hover:text-yellow-400 transition font-semibold">Contacto</Link>
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none"
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
          <Link to="/" className="block py-2 hover:text-yellow-400 font-semibold" onClick={() => setOpen(false)}>Inicio</Link>
          <Link to="/#viajes" className="block py-2 hover:text-yellow-400 font-semibold" onClick={() => setOpen(false)}>Mis viajes</Link>
          <Link to="/#contacto" className="block py-2 hover:text-yellow-400 font-semibold" onClick={() => setOpen(false)}>Contacto</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;