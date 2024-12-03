import React, { useEffect } from "react";

const ContactPage = () => {
  useEffect(() => {
    // Script para Tawk.to
    const tawkScript = document.createElement("script");
    tawkScript.src = "https://embed.tawk.to/674514942480f5b4f5a4080f/1iditgp02";
    tawkScript.async = true;
    tawkScript.charset = "UTF-8";
    tawkScript.setAttribute("crossorigin", "*");
    document.body.appendChild(tawkScript);

    return () => {
      document.body.removeChild(tawkScript);
    };
  }, []);

  useEffect(() => {
    // Cargar fuente Roboto
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="contactContainer">
      <header className="contactHeader">
        <h1 className="contactTitle">SellPhone</h1>
      </header>
      <section className="contactSection">
        <h2 className="contactSubtitle">¿Necesitas ayuda?</h2>
        <p className="contactText">
          Estamos aquí para ayudarte. Usa nuestro chat en vivo para obtener soporte en tiempo real. Haz clic en el ícono
          de chat en la esquina inferior derecha para comenzar.
        </p>
        <p className="contactText">Si prefieres contactarnos por otros medios:</p>
        <ul className="contactList">
          <li>
            <strong>Email:</strong> sellphonecun@gmail.com
          </li>
          <li>
            <strong>Teléfono:</strong> 9985396831
          </li>
          <li>
            <strong>Ubicación:</strong> Cancún, Q. Roo, Benito Juárez
          </li>
        </ul>
        <div className="socialContainer">
          <h3>¡Síguenos en redes sociales!</h3>
          <div className="socialLinks">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="socialLink">
              📘 Facebook
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="socialLink">
              🐦 Twitter
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="socialLink">
              📸 Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
