import React from "react";
import { Link } from "react-router-dom";

function TripList({ trips, onDelete, onEdit }) {
  if (trips.length === 0) {
    return <p className="text-blue-900 mt-4">No hay viajes creados aún.</p>;
  }

  return (
    <ul className="w-full max-w-md mt-4">
      {trips.map((trip) => (
        <li
          key={trip.id}
          className="bg-white rounded shadow p-3 mb-2 flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold text-blue-700">{trip.title}</h3>
            <p className="text-sm text-blue-900">
              {trip.startDate} - {trip.endDate}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/viajes/${trip.id}`}
              className="text-blue-600 hover:underline text-sm"
            >
              Ver
            </Link>
            <button
              className="text-yellow-600 hover:underline text-sm"
              onClick={() => onEdit(trip)}
            >
              Editar
            </button>
            <button
              className="text-red-600 hover:underline text-sm"
              onClick={() => onDelete(trip.id)}
            >
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TripList;