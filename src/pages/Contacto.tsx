import React, { useEffect } from "react";
import "../styles/Contacto.css";

const ContactPage: React.FC = () => {
    useEffect(() => {
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
        const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    return (
        <div className="contacto">
            <div className="container">
                <section className="contact-card">
                    <h1 className="title">¿Necesitas ayuda?</h1>
                    <p className="text">
                        Estamos aquí para ayudarte. Usa nuestro chat en vivo para obtener soporte en tiempo real. 
                        Haz clic en el ícono de chat en la esquina inferior derecha para comenzar.
                    </p>
                    <p className="text">Si prefieres contactarnos por otros medios:</p>
                    <ul className="contact-list">
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
                </section>

                <section className="social-card">
                    <h3 className="social-title">¡Síguenos en redes sociales!</h3>
                    <div className="social-links">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                            📘 Facebook
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                            🐦 Twitter
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                            📸 Instagram
                        </a>
                    </div>
                </section>

                <section className="map-section">
                    <h3 className="map-title">Encuéntranos aquí</h3>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.8757456658047!2d-86.84816972529518!3d21.162655979433915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4c2babcde12345%3A0xf12c3e5a67890f12!2sPlaza%20Las%20Am%C3%A9ricas%2C%20Canc%C3%BAn!5e0!3m2!1ses-419!2smx!4v1693590809999!5m2!1ses-419!2smx"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación en Cancún"
                    ></iframe>
                </section>
            </div>
        </div>
    );
};

export default ContactPage;
