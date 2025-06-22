import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { TripContext } from "../context/TripContext";

// URL pública de tu backend Flask en Codespaces
const API_URL = "https://studious-doodle-pjp55p7gpvj9365q7-5000.app.github.dev";

const Profile = () => {
  const { user, token, logout } = useContext(AuthContext);
  const { trips } = useContext(TripContext);

  // Campos adicionales de perfil (puedes añadir más)
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Cargar datos adicionales del perfil (si los tienes en el backend)
  useEffect(() => {
    if (token) {
      fetch(`${API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          setFullName(data.full_name || "");
          setBio(data.bio || "");
        });
    }
  }, [token]);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_URL}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ full_name: fullName, bio }),
      });
      if (res.ok) {
        setSuccess("Perfil actualizado correctamente.");
        setEditMode(false);
      } else {
        setError("No se pudo actualizar el perfil.");
      }
    } catch {
      setError("Error de conexión con el servidor.");
    }
  };

  if (!user) return <div className="text-center mt-8">No has iniciado sesión.</div>;

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8 border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Perfil de usuario</h2>
      <div className="mb-4">
        <span className="font-semibold text-blue-800">Nombre de usuario:</span>{" "}
        <span className="text-blue-700">{user?.username}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold text-blue-800">Viajes realizados:</span>{" "}
        <span className="text-blue-700">{trips.length}</span>
      </div>
      {editMode ? (
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <div>
            <label className="font-semibold text-blue-800">Nombre completo:</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Tu nombre completo"
            />
          </div>
          <div>
            <label className="font-semibold text-blue-800">Biografía:</label>
            <textarea
              className="input input-bordered w-full"
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Cuéntanos algo sobre ti"
            />
          </div>
          {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}
          {success && <div className="bg-green-100 text-green-700 p-2 rounded">{success}</div>}
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white rounded py-2 px-4 font-bold" type="submit">
              Guardar
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-800 rounded py-2 px-4 font-bold"
              onClick={() => setEditMode(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="mb-4">
            <span className="font-semibold text-blue-800">Nombre completo:</span>{" "}
            <span className="text-blue-700">{fullName || <em>No especificado</em>}</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold text-blue-800">Biografía:</span>{" "}
            <span className="text-blue-700">{bio || <em>No especificada</em>}</span>
          </div>
          <button
            className="bg-blue-600 text-white rounded py-2 px-4 font-bold"
            onClick={() => setEditMode(true)}
          >
            Editar perfil
          </button>
        </>
      )}
      <button
        className="bg-red-600 text-white rounded py-2 font-bold mt-4"
        onClick={logout}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;