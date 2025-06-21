import React from "react";

function Navbar() {
  return (
    <nav className="w-full bg-blue-700 text-white px-4 py-3 flex justify-between items-center shadow-md">
      <span className="font-bold text-xl tracking-tight">TripMate</span>
      <div className="space-x-4">
        <a href="/" className="hover:underline">
          Inicio
        </a>
        <a href="/viajes" className="hover:underline">
          Mis viajes
        </a>
      </div>
    </nav>
  );
}

export default Navbar;