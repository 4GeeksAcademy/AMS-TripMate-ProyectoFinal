import React, { useState } from "react";

function ItineraryForm({ onAddActivity }) {
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [cost, setCost] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!place || !description || !time) return;
    onAddActivity({
      id: Date.now(),
      place,
      description,
      time,
      cost: Number(cost) || 0,
    });
    setPlace("");
    setDescription("");
    setTime("");
    setCost("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded shadow p-4 flex flex-col gap-2 w-full max-w-md mt-6"
    >
      <h3 className="text-lg font-semibold text-blue-700 mb-2">Agregar actividad</h3>
      <input
        type="text"
        placeholder="Lugar"
        className="border rounded px-2 py-1"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        className="border rounded px-2 py-1"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="time"
        className="border rounded px-2 py-1"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <input
        type="number"
        placeholder="Costo estimado"
        className="border rounded px-2 py-1"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        min="0"
      />
      <button
        type="submit"
        className="bg-blue-700 text-white rounded px-4 py-2 mt-2 hover:bg-blue-800"
      >
        Agregar
      </button>
    </form>
  );
}

export default ItineraryForm;