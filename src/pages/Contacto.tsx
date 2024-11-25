import React, { useState } from "react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback("");

    // Validación básica de los campos
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFeedback("Por favor, completa todos los campos.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFeedback("Correo enviado correctamente. ¡Gracias por contactarnos!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFeedback("Hubo un problema al enviar el correo. Inténtalo más tarde.");
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      setFeedback("Hubo un problema al enviar el correo. Inténtalo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ margin: "0", color: "orange" }}>SellPhone</h1>
      </header>
      <section>
        <h2 style={{ color: "#333" }}>Contáctanos</h2>
        <p style={{ lineHeight: "1.6", color: "#555" }}>
          En SellPhone, estamos comprometidos con brindarte el mejor servicio en la compra y venta de equipos de segunda mano.
        </p>
        <ul>
          <li><strong>Email:</strong> sellphonecun@gmail.com</li>
          <li><strong>Teléfono:</strong> 9985396831</li>
          <li><strong>Ubicación:</strong> Cancún Q.Roo, Benito Juárez</li>
        </ul>
      </section>
      <section>
        <h2>Envíanos un mensaje</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
            required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Asunto"
            required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Mensaje"
            rows={5}
            required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: "10px 15px",
              backgroundColor: isSubmitting ? "#ccc" : "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </form>
        {feedback && <p style={{ marginTop: "15px", color: feedback.includes("correctamente") ? "green" : "red" }}>{feedback}</p>}
      </section>
    </div>
  );
};

export default ContactPage;
