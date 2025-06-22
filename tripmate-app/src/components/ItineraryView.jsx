import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";

const groupByDay = (activities) => {
  const grouped = {};
  activities.forEach(act => {
    if (!grouped[act.day]) grouped[act.day] = [];
    grouped[act.day].push(act);
  });
  return grouped;
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

function getTotalCostByDay(activities) {
  return activities.reduce((acc, act) => acc + (Number(act.cost) || 0), 0);
}

function getTotalTripCost(activities) {
  return activities.reduce((acc, act) => acc + (Number(act.cost) || 0), 0);
}

const ItineraryView = ({ activities, onDelete, onEdit, trip, presupuesto }) => {
  if (!activities || !activities.length) {
    return (
      <p className="bg-yellow-50 text-yellow-700 px-3 py-2 rounded shadow mb-4 text-center">
        No hay actividades para este viaje.
      </p>
    );
  }

  const grouped = groupByDay(activities);
  const totalTripCost = getTotalTripCost(activities);

  // Solo calcula porcentaje si hay presupuesto
  const showBar = typeof presupuesto === "number" && presupuesto > 0;
  const porcentaje = showBar ? Math.min(100, (totalTripCost / presupuesto) * 100) : 0;

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">Itinerario Diario</h2>

      {/* Resumen visual de gastos */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-blue-900 text-lg">Gasto total del viaje:</span>
          <span className="font-bold text-green-800 text-lg">€{totalTripCost}</span>
        </div>
        {showBar && (
          <>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className="bg-green-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${porcentaje}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-700">
              Has gastado <span className="font-bold">€{totalTripCost}</span> de <span className="font-bold">€{presupuesto}</span>
            </p>
          </>
        )}
      </div>

      {Object.keys(grouped).sort().map(day => (
        <div key={day} className="mb-8">
          {/* Fecha del día */}
          <div className="flex items-center bg-white border-2 border-blue-300 rounded-xl px-4 py-3 mb-4 shadow">
            <FaRegCalendarAlt className="text-3xl text-blue-600 mr-3" />
            <span className="text-xl font-semibold">{formatDate(day)}</span>
          </div>
          {/* Actividades */}
          <div className="flex flex-col gap-4">
            {grouped[day]
              .sort((a, b) => a.time.localeCompare(b.time))
              .map(act => (
                <div
                  key={act.id}
                  className="bg-white border border-gray-200 rounded-xl shadow flex flex-col sm:flex-row items-center justify-between px-4 py-3"
                >
                  <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
                    <FaRegClock className="text-2xl text-blue-500 mr-3" />
                    <div>
                      <div className="font-bold text-blue-900 text-lg">{act.time} | {act.place}</div>
                      <div className="text-gray-700">{act.description}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-green-700 font-bold text-lg mb-2 sm:mb-0">€{act.cost}</span>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      {onEdit && (
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-3 py-1 rounded shadow"
                          onClick={() => onEdit(act)}
                        >
                          Editar
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className="bg-red-600 hover:bg-red-700 transition text-white px-3 py-1 rounded shadow"
                          onClick={() => onDelete(act.id)}
                        >
                          Borrar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* Total del día */}
          <div className="flex justify-between items-center mt-2 mb-4">
            <span className="font-bold text-blue-800">Total día:</span>
            <span className="font-bold text-green-700">
              €{getTotalCostByDay(grouped[day])}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryView;