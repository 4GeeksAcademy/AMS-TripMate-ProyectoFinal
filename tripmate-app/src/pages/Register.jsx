import { useState } from "react";
import { useNavigate } from "react-router-dom";

// URL pública de tu backend Flask en Codespaces
const API_URL = "https://studious-doodle-pjp55p7gpvj9365q7-5000.app.github.dev";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username.trim()) {
      setError("Debes introducir un nombre de usuario.");
      return;
    }
    if (!password) {
      setError("Debes introducir una contraseña.");
      return;
    }
    if (!confirmPassword) {
      setError("Debes repetir la contraseña.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        setSuccess("Usuario creado. Ahora puedes iniciar sesión.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError("El usuario ya existe o los datos no son válidos.");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor. Revisa la URL de la API.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow mt-8 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center mb-4">Registro</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 rounded">{success}</div>}
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="input input-bordered"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="input input-bordered"
        required
      />
      <input
        type="password"
        placeholder="Repite la contraseña"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        className="input input-bordered"
        required
      />
      <button className="bg-blue-600 text-white rounded py-2 font-bold">Registrarse</button>
      <button type="button" className="text-blue-700 underline" onClick={() => navigate("/login")}>
        ¿Ya tienes cuenta? Inicia sesión
      </button>
    </form>
  );
};

export default Register;