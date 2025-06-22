import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { TripContext } from "../context/TripContext";
import ItineraryForm from "../components/ItineraryForm";
import ItineraryView from "../components/ItineraryView";
import ShareButton from "../components/ShareButton";

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips, setTrips } = useContext(TripContext);

  const trip = trips.find(t => String(t.id) === String(id));
  const [editingActivity, setEditingActivity] = useState(null);

  if (!trip) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded shadow text-center mt-8">
        Viaje no encontrado.
        <button
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate("/")}
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  // Añadir actividad
  const handleAddActivity = (activity) => {
    const updatedTrips = trips.map(t =>
      t.id === trip.id
        ? { ...t, activities: [...t.activities, { ...activity, id: Date.now() }] }
        : t
    );
    setTrips(updatedTrips);
  };

  // Editar actividad
  const handleEditActivity = (activity) => {
    setEditingActivity(activity);
  };

  // Guardar edición
  const handleSaveEdit = (updatedActivity) => {
    const updatedTrips = trips.map(t =>
      t.id === trip.id
        ? {
            ...t,
            activities: t.activities.map(act =>
              act.id === updatedActivity.id ? updatedActivity : act
            ),
          }
        : t
    );
    setTrips(updatedTrips);
    setEditingActivity(null);
  };

  // Borrar actividad
  const handleDeleteActivity = (activityId) => {
    const updatedTrips = trips.map(t =>
      t.id === trip.id
        ? {
            ...t,
            activities: t.activities.filter(act => act.id !== activityId),
          }
        : t
    );
    setTrips(updatedTrips);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-gradient-to-r from-blue-100 via-white to-blue-50 rounded-2xl shadow-lg p-8 mb-8 border border-blue-100 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">{trip.title}</h1>
        <div className="text-blue-800 mb-2">
          {trip.city && <span className="mr-2">🌍 {trip.city}</span>}
          <span>
            📅 {trip.startDate} - {trip.endDate}
          </span>
        </div>
        <ShareButton tripId={trip.id} />
      </div>

      <div className="mb-8">
        <ItineraryForm
          trip={trip}
          onAddActivity={handleAddActivity}
          onEdit={editingActivity}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={() => setEditingActivity(null)}
        />
      </div>

      <ItineraryView
        activities={trip.activities}
        onDelete={handleDeleteActivity}
        onEdit={handleEditActivity}
        trip={trip}
        presupuesto={trip.budget} // Puede ser undefined
      />
    </div>
  );
};

export default TripDetail;