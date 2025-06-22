import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-950/95 text-white border-t-4 border-yellow-400 shadow-xl w-full">
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="text-center md:text-left">
        <span className="font-bold text-lg">TripMate</span> &copy; {new Date().getFullYear()}<br />
        <span className="text-yellow-200 text-sm">Organiza y comparte tus viajes</span>
      </div>
      <div className="flex gap-6 text-2xl">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition" aria-label="Instagram">
          <FaInstagram />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;