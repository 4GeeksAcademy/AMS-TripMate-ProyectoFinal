import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { TripContext } from "../context/TripContext";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

// URL pública de tu backend Flask en Codespaces
const API_URL = "https://studious-doodle-pjp55p7gpvj9365q7-5000.app.github.dev";

const TripForm = () => {
  const { token } = useContext(AuthContext);
  const { trips, setTrips } = useContext(TripContext);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!title || !location || !startDate || !endDate) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (endDate < startDate) {
      setError("La fecha de fin no puede ser anterior a la de inicio.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          city: location,
          startDate,
          endDate,
          budget: budget ? Number(budget) : undefined,
          activities: [],
        }),
      });
      if (res.ok) {
        const trip = await res.json();
        setSuccess("¡Viaje creado con éxito!");
        setTitle("");
        setLocation("");
        setStartDate("");
        setEndDate("");
        setBudget("");
        // Opcional: recargar la lista de viajes desde el backend
        // O simplemente añade el nuevo viaje a trips si tu backend lo devuelve
        setTrips([...trips, trip]);
      } else {
        setError("No se pudo crear el viaje. Intenta de nuevo.");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-r from-blue-50 via-white to-blue-100 rounded-2xl shadow p-6 mb-8 border border-blue-100"
    >
      <h2 className="text-xl font-bold text-blue-800 mb-4 text-center">
        Crear nuevo viaje
      </h2>
      {error && (
        <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-2 text-center">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 px-3 py-2 rounded mb-2 text-center">
          {success}
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-2 mb-2">
        <input
          className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded p-2 w-full transition"
          type="text"
          placeholder="Nombre del viaje"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className="relative w-full">
          <FaMapMarkerAlt className="absolute left-3 top-3 text-blue-400" />
          <input
            className="pl-10 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded p-2 w-full transition"
            type="text"
            placeholder="Ciudad o país"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <div className="relative w-full">
          <FaCalendarAlt className="absolute left-3 top-3 text-blue-400" />
          <input
            className="pl-10 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded p-2 w-full transition"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="relative w-full">
          <FaCalendarAlt className="absolute left-3 top-3 text-blue-400" />
          <input
            className="pl-10 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded p-2 w-full transition"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <input
          type="number"
          min="0"
          step="1"
          placeholder="Presupuesto (€) (opcional)"
          className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded p-2 w-full transition"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded shadow font-semibold"
        type="submit"
      >
        Crear viaje
      </button>
    </form>
  );
};

export default TripForm;