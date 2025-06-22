import { useState } from "react";

const ItineraryForm = ({ onAddActivity }) => {
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!day || !time || !place) {
      setError("Día, hora y lugar son obligatorios.");
      return;
    }
    onAddActivity({
      id: Date.now(),
      day,
      time,
      place,
      description,
      cost: Number(cost) || 0,
    });
    setDay("");
    setTime("");
    setPlace("");
    setDescription("");
    setCost("");
    setSuccess("¡Actividad agregada!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-r from-blue-50 via-white to-blue-100 rounded-2xl shadow p-6 mb-8 border border-blue-100"
    >
      <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">Agregar actividad</h3>
      {error && (
        <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-2 text-center">{error}</div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 px-3 py-2 rounded mb-2 text-center">{success}</div>
      )}
      <div className="flex flex-col md:flex-row gap-2 mb-2">
        <input
          className="border p-2 w-full"
          type="date"
          value={day}
          onChange={e => setDay(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2 mb-2">
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Lugar"
          value={place}
          onChange={e => setPlace(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          className="border p-2 w-full"
          type="number"
          placeholder="Costo estimado"
          value={cost}
          onChange={e => setCost(e.target.value)}
        />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full" type="submit">
        Agregar
      </button>
    </form>
  );
};

export default ItineraryForm;