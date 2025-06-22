const Contacts = () => (
  <section className="bg-white rounded-2xl shadow-lg p-8 my-8 border border-blue-100 max-w-2xl mx-auto">
    <h1 className="text-2xl font-bold text-blue-900 mb-4">Contacto</h1>
    <p className="mb-2">¿Tienes dudas o sugerencias? ¡Contáctanos!</p>
    <ul className="text-blue-800">
      <li>Email: <a href="mailto:info@tripmate.com" className="text-blue-600 underline">info@tripmate.com</a></li>
      <li>Teléfono: <a href="tel:+34123456789" className="text-blue-600 underline">+34 123 456 789</a></li>
      <li>Instagram: <a href="https://instagram.com/tripmate" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">@tripmate</a></li>
    </ul>
  </section>
);

export default Contacts;