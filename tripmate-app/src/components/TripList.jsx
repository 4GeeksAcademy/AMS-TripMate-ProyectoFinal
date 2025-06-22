import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TripContext } from "../context/TripContext";
import { saveTrips } from "../utils/storage";
import { FaMapMarkerAlt, FaCalendarAlt, FaTrashAlt } from "react-icons/fa";

const TripList = () => {
  const { trips, setTrips } = useContext(TripContext);
  const navigate = useNavigate();

  const handleDeleteTrip = (tripId) => {
    if (window.confirm("¿Seguro que quieres borrar este viaje?")) {
      const updatedTrips = trips.filter(t => t.id !== tripId);
      setTrips(updatedTrips);
      saveTrips(updatedTrips);
      navigate("/");
    }
  };

  if (!trips.length) {
    return (
      <p className="bg-yellow-50 text-yellow-700 px-3 py-2 rounded shadow mb-4 text-center">
        No hay viajes creados.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">Tus viajes</h2>
      <ul className="flex flex-col gap-4">
        {trips.map(trip => (
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