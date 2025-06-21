import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ItineraryForm from "../components/ItineraryForm";
import ItineraryView from "../components/ItineraryView";
import ShareButton from "../components/ShareButton";

function TripDetail() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [editActivity, setEditActivity] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("trips");
    if (stored) {
      const trips = JSON.parse(stored);
      const found = trips.find((t) => String(t.id) === id);
      setTrip(found);
    }
  }, [id]);

  const saveTrips = (updatedTrip) => {
    setTrip(updatedTrip);
    const stored = localStorage.getItem("trips");
    if (stored) {
      const trips = JSON.parse(stored);
      const updatedTrips = trips.map((t) =>
        String(t.id) === id ? updatedTrip : t
      );
      localStorage.setItem("trips", JSON.stringify(updatedTrips));
    }
  };

  const handleAddActivity = (activity) => {
    let updatedActivities;
    if (editActivity) {
      // Editar actividad existente
      updatedActivities = (trip.activities || []).map((a) =>
        a.id === editActivity.id ? { ...activity, id: editActivity.id } : a
      );
      setEditActivity(null);
    } else {
      // Agregar nueva actividad
      updatedActivities = [...(trip.activities || []), activity];
    }
    const updatedTrip = { ...trip, activities: updatedActivities };
    saveTrips(updatedTrip);
  };

  const handleDeleteActivity = (activityId) => {
    const updatedActivities = (trip.activities || []).filter(
      (a) => a.id !== activityId
    );
    const updatedTrip = { ...trip, activities: updatedActivities };
    saveTrips(updatedTrip);
  };

  const handleEditActivity = (activity) => {
    setEditActivity(activity);
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
    <div className="w-full max-w-md mx-auto text-center mt-8 px-2">
      <h2 className="text-2xl font-semibold text-blue-800 break-words">{trip.title}</h2>
      <p className="mt-2 text-blue-900">
        {trip.startDate} - {trip.endDate}
      </p>
      <ItineraryForm
        onAddActivity={handleAddActivity}
        editActivity={editActivity}
      />
      <ItineraryView
        activities={trip.activities || []}
        onDelete={handleDeleteActivity}
        onEdit={handleEditActivity}
      />
      <ShareButton url={window.location.href} />
      <Link to="/" className="text-blue-700 underline block mt-4">Volver al inicio</Link>
    </div>
  );
}

export default TripDetail;