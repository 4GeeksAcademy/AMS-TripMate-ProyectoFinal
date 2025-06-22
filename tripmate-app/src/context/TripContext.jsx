import { createContext, useState, useEffect } from "react";
import { loadTrips } from "../utils/storage";

// Crea el contexto para los viajes
export const TripContext = createContext();

// Proveedor del contexto de viajes
export function TripProvider({ children }) {
  const [trips, setTrips] = useState([]);

  // Carga los viajes desde localStorage al iniciar la app
  useEffect(() => {
    setTrips(loadTrips());
  }, []);

  return (
    <TripContext.Provider value={{ trips, setTrips }}>
      {children}
    </TripContext.Provider>
  );
}