// Guarda un valor en localStorage de forma segura
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error guardando en localStorage:", e);
  }
}

// Carga un valor de localStorage de forma segura
export function loadFromStorage(key, defaultValue = []) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error("Error leyendo de localStorage:", e);
    return defaultValue;
  }
}

// Funciones específicas para viajes
export function saveTrips(trips) {
  saveToStorage("trips", trips);
}

export function loadTrips() {
  return loadFromStorage("trips", []);
}