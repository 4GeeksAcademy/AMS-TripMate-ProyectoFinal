import TripForm from "../components/TripForm";

const CreateTrip = () => (
  <section className="bg-white rounded-2xl shadow-lg p-8 my-8 border border-blue-100 max-w-2xl mx-auto">
    <h1 className="text-2xl font-bold text-blue-900 mb-4">¡Crea tu nuevo viaje!</h1>
    <TripForm />
  </section>
);

export default CreateTrip;