import { useEffect } from "react";

const TawkToChat: React.FC = () => {
  useEffect(() => {
    // Configuración del script de Tawk.to
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/674514942480f5b4f5a4080f/1iditgp02";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    // Agregar el script al DOM
    document.body.appendChild(script);

    // Limpiar el script al desmontar el componente
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // No renderiza nada en pantalla
};

export default TawkToChat;