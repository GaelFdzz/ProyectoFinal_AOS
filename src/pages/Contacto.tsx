import React, { useEffect } from "react";

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

  // Importación de fuente desde Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const styles = {
    container: { fontFamily: "'Roboto', sans-serif", maxWidth: "800px", margin: "0 auto", padding: "20px" },
    header: { textAlign: "center", marginBottom: "30px" },
    title: { margin: "0", fontSize: "3.2rem", color: "#FFDE21" },
    section: { textAlign: "center", padding: "20px", backgroundColor: "#f1f5f9", borderRadius: "15px" },
    subtitle: { fontSize: "2rem", color: "#000" },
    text: { lineHeight: "1.8", color: "#000", fontSize: "1.2rem" },
    list: { listStyle: "none", padding: "0", fontSize: "1.2rem", color: "#000" },
    link: {
      textDecoration: "none",
      padding: "15px 20px",
      fontSize: "1.6rem",
      borderRadius: "10px",
      color: "#000",
      backgroundColor: "#FFDE21",
      transition: "background-color 0.3s",
    },
    linkHover: { backgroundColor: "#E6C71E" },
    social: { display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px" },
    footer: {
      textAlign: "center",
      marginTop: "40px",
      padding: "20px",
      backgroundColor: "#1e293b",
      color: "#fff",
      fontSize: "1rem",
      borderRadius: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>SellPhone</h1>
      </header>
      <section style={styles.section}>
        <h2 style={styles.subtitle}>¿Necesitas ayuda?</h2>
        <p style={styles.text}>
          Estamos aquí para ayudarte. Usa nuestro chat en vivo para obtener soporte en tiempo real. Haz clic en el ícono
          de chat en la esquina inferior derecha para comenzar.
        </p>
        <p style={styles.text}>Si prefieres contactarnos por otros medios:</p>
        <ul style={styles.list}>
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
          <div style={styles.social}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={styles.link}>
              📘 Facebook
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={styles.link}>
              🐦 Twitter
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={styles.link}>
              📸 Instagram
            </a>
          </div>
        </div>
      </section>
      <footer style={styles.footer}>
        <p>© 2024 SellPhone. Todos los derechos reservados. Diseñado en Cancún, Q. Roo.</p>
      </footer>
    </div>
  );
};

export default ContactPage;
