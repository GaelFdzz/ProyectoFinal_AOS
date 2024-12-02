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
        link.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    return (
        <div className="contacto">

            <div className="container">
                <section className="section">
                    <h1 className="title">¿Necesitas ayuda?</h1>
                    <p className="text">
                        Estamos aquí para ayudarte. Usa nuestro chat en vivo para obtener soporte en tiempo real. Haz clic en el ícono
                        de chat en la esquina inferior derecha para comenzar.
                    </p>
                    <p className="text">Si prefieres contactarnos por otros medios:</p>
                    <ul className="list">
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
                    <div style={{ marginTop: "30px" }}>
                        <h3 style={{ fontSize: "1.5rem", color: "#000" }}>¡Síguenos en redes sociales!</h3>
                        <div className="social">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="link">
                                📘 Facebook
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="link">
                                🐦 Twitter
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="link">
                                📸 Instagram
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ContactPage;
