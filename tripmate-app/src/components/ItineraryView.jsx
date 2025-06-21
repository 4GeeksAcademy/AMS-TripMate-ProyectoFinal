import React from "react";

// Agrupa actividades por día
function groupByDay(activities = []) {
  const grouped = {};
  activities.forEach((act) => {
    const day = act.day || "Sin día";
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(act);
  });
  return grouped;
}

function ItineraryView({ activities = [], onDelete, onEdit }) {
  if (!activities.length) {
    return <p className="text-blue-900">No hay actividades para este viaje.</p>;
  }

  const grouped = groupByDay(activities);

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      {Object.keys(grouped).sort().map((day) => (
        <div key={day} className="mb-6">
          <h4 className="font-bold text-blue-700 mb-2">
            {day === "Sin día" ? "Sin día asignado" : `📅 ${day}`}
          </h4>
          <ul>
            {grouped[day].map((act) => (
              <li
                key={act.id}
                className="bg-white rounded shadow p-3 mb-2 text-left"
              >
                <div className="flex justify-between items-center">
                  <span>
                    <span className="font-bold text-blue-700">{act.place}</span>
                    <span className="ml-2 text-sm text-blue-900">{act.time}</span>
                  </span>
                  <span>
                    <button
                      className="text-yellow-600 hover:underline mr-2"
                      onClick={() => onEdit(act)}
                    >
                      Editar
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => onDelete(act.id)}
                    >
                      Eliminar
                    </button>
                  </span>
                </div>
                <div className="text-blue-900">{act.description}</div>
                <div className="text-green-700 text-sm">
                  {act.cost ? `€${act.cost}` : "Gratis"}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ItineraryView;