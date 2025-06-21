import React, { useState, useEffect } from "react";

function TripForm({ onAddTrip, editTrip }) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (editTrip) {
      setTitle(editTrip.title || "");
      setStartDate(editTrip.startDate || "");
      setEndDate(editTrip.endDate || "");
    } else {
      setTitle("");
      setStartDate("");
      setEndDate("");
    }
  }, [editTrip]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !startDate || !endDate) return;
    onAddTrip({ title, startDate, endDate });
    setTitle("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded shadow p-4 flex flex-col gap-2 w-full max-w-md"
    >
      <h2 className="text-xl font-semibold text-blue-700 mb-2">
        {editTrip ? "Editar viaje" : "Nuevo viaje"}
      </h2>
      <input
        type="text"
        placeholder="Nombre del viaje"
        className="border rounded px-2 py-1"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        className="border rounded px-2 py-1"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        className="border rounded px-2 py-1"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-700 text-white rounded px-4 py-2 mt-2 hover:bg-blue-800"
      >
        {editTrip ? "Guardar cambios" : "Crear viaje"}
      </button>
    </form>
  );
}

export default TripForm;