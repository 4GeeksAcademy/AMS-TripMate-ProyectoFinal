import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { TripContext } from "../context/TripContext";
import ItineraryForm from "../components/ItineraryForm";
import ItineraryView from "../components/ItineraryView";
import ShareButton from "../components/ShareButton";
import { saveTrips } from "../utils/storage";
import { FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaTrashAlt } from "react-icons/fa";

const TripDetail = () => {
  const { id } = useParams();
  const { trips, setTrips } = useContext(TripContext);
  const navigate = useNavigate();
  const [editSuccess, setEditSuccess] = useState("");
  const [editError, setEditError] = useState("");

  const trip = trips.find(t => String(t.id) === id);

  if (!trip) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <p className="text-red-600">Viaje no encontrado.</p>
        <button className="mt-2 text-blue-700 underline" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    );
  }

  // --- Manejo de actividades ---
  const handleAddActivity = (activity) => {
    const updatedTrips = trips.map(t =>
      t.id === trip.id
        ? { ...t, activities: [...t.activities, activity] }
        : t
    );
    setTrips(updatedTrips);
    saveTrips(updatedTrips);
  };

  const handleDeleteActivity = (activityId) => {
    const updatedTrips = trips.map(t =>
      t.id === trip.id
        ? { ...t, activities: t.activities.filter(a => a.id !== activityId) }
        : t
    );
    setTrips(updatedTrips);
    saveTrips(updatedTrips);
  };

  const handleEditActivity = (editedActivity) => {
    const updatedTrips = trips.map(t =>
      t.id === trip.id
        ? {
            ...t,
            activities: t.activities.map(a =>
              a.id === editedActivity.id ? editedActivity : a
            ),
          }
        : t
    );
    setTrips(updatedTrips);
    saveTrips(updatedTrips);
  };

  // --- Manejo de edición de viaje ---
  const handleEditTrip = (e) => {
    e.preventDefault();
    setEditError("");
    setEditSuccess("");
    const title = e.target.title.value;
    const location = e.target.location.value;
    const startDate = e.target.startDate.value;
    const endDate = e.target.endDate.value;
    if (!title || !location || !startDate || !endDate) {
      setEditError("Todos los campos son obligatorios.");
      return;
    }
    if (endDate < startDate) {
      setEditError("La fecha de fin no puede ser anterior a la de inicio.");
      return;
    }
    const updatedTrips = trips.map(t =>
      t.id === trip.id
        ? {
            ...t,
            title,
            location,
            startDate,
            endDate,
          }
        : t
    );
    setTrips(updatedTrips);
    saveTrips(updatedTrips);
    setEditSuccess("¡Viaje actualizado!");
  };

  // --- Borrar viaje completo ---
  const handleDeleteTrip = () => {
    if (window.confirm("¿Seguro que quieres borrar este viaje?")) {
      const updatedTrips = trips.filter(t => t.id !== trip.id);
      setTrips(updatedTrips);
      saveTrips(updatedTrips);
      navigate("/");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Encabezado visual */}
      <div className="bg-blue-100 rounded-2xl shadow flex flex-col sm:flex-row items-center justify-between p-6 mb-8 border border-blue-200">
        <div>
          <h2 className="text-3xl font-extrabold text-blue-900 mb-2 flex items-center gap-2">
            <FaEdit className="text-blue-400" /> {trip.title}
          </h2>
          <div className="flex items-center text-blue-700 mb-1 gap-2">
            <FaMapMarkerAlt />
            <span className="font-semibold">{trip.location}</span>
          </div>
          <div className="flex items-center text-blue-700 gap-2">
            <FaCalendarAlt />
            <span>
              {trip.startDate} - {trip.endDate}
            </span>
          </div>
        </div>
        <ShareButton tripId={trip.id} />
      </div>

      {/* Formulario de edición */}
      <form
        onSubmit={handleEditTrip}
        className="bg-white p-4 rounded-2xl shadow mb-8 border border-blue-100"
      >
        <h3 className="font-bold mb-2 text-blue-800 flex items-center gap-2">
          <FaEdit /> Editar viaje
        </h3>
        {editError && <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-2">{editError}</div>}
        {editSuccess && <div className="bg-green-100 text-green-700 px-3 py-2 rounded mb-2">{editSuccess}</div>}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded p-2 mb-2 w-full transition"
            type="text"
            name="title"
            defaultValue={trip.title}
            required
            placeholder="Nombre del viaje"
          />
          <input
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded p-2 mb-2 w-full transition"
            type="text"
            name="location"
            defaultValue={trip.location}
            required
            placeholder="Ciudad o país"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded p-2 mb-2 w-full transition"
            type="date"
            name="startDate"
            defaultValue={trip.startDate}
            required
          />
          <input
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded p-2 mb-2 w-full transition"
            type="date"
            name="endDate"
            defaultValue={trip.endDate}
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-4 py-2 rounded shadow w-full sm:w-auto" type="submit">
            Guardar cambios
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded shadow w-full sm:w-auto"
            type="button"
            onClick={handleDeleteTrip}
          >
            Borrar viaje completo
          </button>
        </div>
      </form>

      {/* Formulario para agregar actividades */}
      <ItineraryForm onAddActivity={handleAddActivity} />

      {/* Itinerario diario */}
      <ItineraryView
        activities={trip.activities}
        onDelete={handleDeleteActivity}
        onEdit={handleEditActivity}
      />
    </div>
  );
};

export default TripDetail;