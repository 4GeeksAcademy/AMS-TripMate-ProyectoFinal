import { useState } from "react";
import { FaShareAlt, FaCheckCircle } from "react-icons/fa";

const ShareButton = ({ tripId }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/trip/${tripId}`;

  const handleShare = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-4 flex items-center">
      <button
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded shadow font-semibold focus:outline-none focus:ring-2 focus:ring-green-300"
        onClick={handleShare}
      >
        <FaShareAlt className="text-lg" />
        Compartir itinerario
      </button>
      {copied && (
        <span className="flex items-center ml-3 text-green-700 bg-green-100 px-3 py-1 rounded transition animate-fade-in">
          <FaCheckCircle className="mr-1" />
          ¡Enlace copiado!
        </span>
      )}
    </div>
  );
};

export default ShareButton;