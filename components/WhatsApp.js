import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsApp = ({ info }) => {
  return (
    <a
      href={`https://wa.me/${info?.settings?.whatsAppNumber}`}
      className="whats-app"
    >
      <FaWhatsapp />
    </a>
  );
};

export default WhatsApp;
