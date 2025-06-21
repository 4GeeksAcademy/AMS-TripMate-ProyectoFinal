import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ItineraryForm from "../components/ItineraryForm";

function TripDetail() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("trips");
    if (stored) {
      const trips = JSON.parse(stored);
      const found = trips.find((t) => String(t.id) === id);
      setTrip(found);
    }
  }, [id]);

  const handleAddActivity = (activity) => {
    const updatedTrip = {
      ...trip,
      activities: [...(trip.activities || []), activity],
    };
    setTrip(updatedTrip);

    // Actualiza en localStorage
    const stored = localStorage.getItem("trips");
    if (stored) {
      const trips = JSON.parse(stored);
      const updatedTrips = trips.map((t) =>
        String(t.id) === id ? updatedTrip : t
      );
      localStorage.setItem("trips", JSON.stringify(updatedTrips));
    }
  };

  if (!trip) {
    return (
      <div className="text-center mt-8">
        <h2 className="text-2xl font-semibold text-red-700">Viaje no encontrado</h2>
        <Link to="/" className="text-blue-700 underline">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="text-center mt-8">
      <h2 className="text-2xl font-semibold text-blue-800">{trip.title}</h2>
      <p className="mt-2 text-blue-900">
        {trip.startDate} - {trip.endDate}
      </p>
      <ItineraryForm onAddActivity={handleAddActivity} />
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">Actividades</h3>
        {trip.activities && trip.activities.length > 0 ? (
          <ul className="max-w-md mx-auto">
            {trip.activities.map((act) => (
              <li
                key={act.id}
                className="bg-white rounded shadow p-3 mb-2 text-left"
              >
                <div className="flex justify-between">
                  <span className="font-bold text-blue-700">{act.place}</span>
                  <span className="text-sm text-blue-900">{act.time}</span>
                </div>
                <div className="text-blue-900">{act.description}</div>
                <div className="text-green-700 text-sm">
                  {act.cost ? `€${act.cost}` : "Gratis"}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-blue-900">No hay actividades para este viaje.</p>
        )}
      </div>
      <Link to="/" className="text-blue-700 underline block mt-4">Volver al inicio</Link>
    </div>
  );
}

export default TripDetail;