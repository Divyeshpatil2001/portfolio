import React from 'react';
import ReactDOM from 'react-dom';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const phoneNumber = '918160688185';
  const waUrl = `https://wa.me/${phoneNumber}`;

  const button = (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      {/* Pulse rings */}
      <span className="wa-pulse wa-pulse-1" />
      <span className="wa-pulse wa-pulse-2" />

      {/* Official WhatsApp SVG logo */}
      <svg
        className="wa-icon"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="24" fill="#25D366" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M34.6 13.3A14.85 14.85 0 0 0 24.05 9C15.77 9 9.04 15.73 9.04 24.01c0 2.65.69 5.24 2 7.52L9 39l7.66-2.01a14.9 14.9 0 0 0 7.38 1.95h.01c8.27 0 15-6.73 15-15.01a14.9 14.9 0 0 0-4.45-10.63ZM24.05 36.4a12.35 12.35 0 0 1-6.3-1.73l-.45-.27-4.66 1.22 1.24-4.54-.3-.47a12.35 12.35 0 0 1-1.9-6.6c0-6.83 5.56-12.38 12.39-12.38a12.3 12.3 0 0 1 8.76 3.63 12.35 12.35 0 0 1 3.63 8.77c0 6.83-5.56 12.37-12.41 12.37Zm6.79-9.27c-.37-.19-2.2-1.09-2.54-1.21-.34-.12-.59-.18-.84.18-.25.37-.96 1.21-1.17 1.46-.22.25-.43.28-.8.09-.37-.18-1.57-.58-2.99-1.84a11.24 11.24 0 0 1-2.07-2.57c-.22-.37-.02-.57.16-.75.17-.17.37-.43.56-.65.18-.22.25-.37.37-.62.12-.25.06-.46-.03-.65-.09-.18-.84-2.03-1.15-2.78-.3-.73-.61-.63-.84-.64h-.72c-.25 0-.65.09-1 .46-.34.37-1.3 1.27-1.3 3.1 0 1.83 1.33 3.6 1.52 3.85.18.25 2.63 4.01 6.37 5.62.89.38 1.58.61 2.12.78.89.28 1.7.24 2.34.15.71-.11 2.2-.9 2.51-1.77.31-.87.31-1.61.22-1.77-.09-.16-.34-.25-.71-.43Z"
          fill="white"
        />
      </svg>
    </a>
  );

  // Portal mounts directly on document.body — bypasses the App div's
  // overflow-x:hidden which breaks position:fixed in browsers
  return ReactDOM.createPortal(button, document.body);
};

export default WhatsAppButton;
