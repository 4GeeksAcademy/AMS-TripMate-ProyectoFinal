import TripForm from "../components/TripForm";
import TripList from "../components/TripList";
import { FaSuitcaseRolling } from "react-icons/fa";

const Home = () => (
  <div className="max-w-2xl mx-auto p-4">
    <div className="bg-gradient-to-r from-blue-100 via-white to-blue-50 rounded-2xl shadow-lg p-8 mb-8 border border-blue-100 flex flex-col items-center">
      <FaSuitcaseRolling className="text-blue-500 text-5xl mb-4" />
      <h1 className="text-3xl font-extrabold text-blue-900 mb-2 text-center">¡Bienvenido a TripMate!</h1>
      <p className="text-blue-700 text-center mb-6">
        Organiza tus viajes, crea itinerarios diarios y comparte tus aventuras.
      </p>
      <div className="w-full">
        <TripForm />
      </div>
    </div>
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
      <TripList />
    </div>
  </div>
);

export default Home;