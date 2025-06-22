import { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { TripContext } from "../context/TripContext";
import { saveTrips } from "../utils/storage";
import { FaMapMarkerAlt, FaCalendarAlt, FaTrashAlt } from "react-icons/fa";

// URL pública de tu backend Flask en Codespaces
const API_URL = "https://studious-doodle-pjp55p7gpvj9365q7-5000.app.github.dev";

const TripList = () => {
  const { token } = useContext(AuthContext);
  const { trips, setTrips } = useContext(TripContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_URL}/api/trips`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setTrips(data);
        } else {
          setError("No se pudieron cargar los viajes.");
        }
      } catch (err) {
        setError("No se pudo conectar con el servidor.");
      }
      setLoading(false);
    };
    if (token) fetchTrips();
  }, [token, setTrips]);

  const handleDeleteTrip = (tripId) => {
    if (window.confirm("¿Seguro que quieres borrar este viaje?")) {
      const updatedTrips = trips.filter(t => t.id !== tripId);
      setTrips(updatedTrips);
      saveTrips(updatedTrips);
      navigate("/");
    }
  };

  if (loading) return <div className="text-center">Cargando viajes...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (!trips || trips.length === 0)
    return <div className="text-center text-blue-700">No tienes viajes guardados.</div>;

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-800 mb-4 text-center">Tus viajes</h2>
      <ul className="space-y-4">
        {trips.map((trip) => (
          <li
            key={trip.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-blue-50 rounded-xl shadow p-4 border-l-8 border-blue-400 transition hover:shadow-lg"
          >
            <Link
              to={`/trip/${trip.id}`}
              className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 text-blue-800 hover:underline font-semibold"
            >
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-blue-400" />
                {trip.location}
              </span>
              <span className="hidden sm:inline">|</span>
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="text-blue-400" />
                {trip.startDate} - {trip.endDate}
              </span>
              <span className="hidden sm:inline">|</span>
              <span className="font-bold">{trip.title}</span>
            </Link>
            <button
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 transition text-white px-3 py-1 rounded shadow mt-3 sm:mt-0 sm:ml-4"
              onClick={() => handleDeleteTrip(trip.id)}
            >
              <FaTrashAlt />
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;