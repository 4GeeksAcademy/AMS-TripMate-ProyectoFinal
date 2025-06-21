import React, { useState, useEffect } from "react";
import TripForm from "../components/TripForm";
import TripList from "../components/TripList";

function Home() {
  const [trips, setTrips] = useState([]);

  // Cargar viajes desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem("trips");
    if (stored) setTrips(JSON.parse(stored));
  }, []);

  // Guardar viajes en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  const handleAddTrip = (trip) => {
    setTrips([...trips, { ...trip, id: Date.now() }]);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mt-8">
        <h2 className="text-2xl font-semibold text-blue-800">Bienvenido a TripMate</h2>
        <p className="mt-2 text-blue-900">¡Comienza creando tu primer viaje!</p>
      </div>
      <TripForm onAddTrip={handleAddTrip} />
      <TripList trips={trips} />
    </div>
  );
}

export default Home;