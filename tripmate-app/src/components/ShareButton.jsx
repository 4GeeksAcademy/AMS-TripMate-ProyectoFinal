import React, { useState } from "react";

function ShareButton({ url }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("No se pudo copiar el enlace.");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
      type="button"
    >
      {copied ? "¡Enlace copiado!" : "Compartir viaje"}
    </button>
  );
}

export default ShareButton;