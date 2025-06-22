import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// URL pública de tu backend Flask en Codespaces
const API_URL = "https://studious-doodle-pjp55p7gpvj9365q7-5000.app.github.dev";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const data = await res.json();
        login(data.access_token, data.username);
        navigate("/profile");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor. Revisa la URL de la API.");
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-lg p-8 my-8 border border-blue-100 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}
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
        <button className="bg-blue-600 text-white rounded py-2 font-bold">Entrar</button>
      </form>
      <button type="button" className="text-blue-700 underline" onClick={() => navigate("/register")}>
        ¿No tienes cuenta? Regístrate
      </button>
    </section>
  );
};

export default Login;
