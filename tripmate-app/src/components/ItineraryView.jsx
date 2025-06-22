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

const ItineraryView = ({ activities, onDelete, onEdit }) => {
  if (!activities || !activities.length) {
    return (
      <p className="bg-yellow-50 text-yellow-700 px-3 py-2 rounded shadow mb-4 text-center">
        No hay actividades para este viaje.
      </p>
    );
  }

  const grouped = groupByDay(activities);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">Itinerario Diario</h2>
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
        </div>
      ))}
    </div>
  );
};

export default ItineraryView;