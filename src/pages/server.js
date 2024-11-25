const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para enviar correos
app.post("/send-email", async (req, res) => {
  const { name, email, subject, message, recipient } = req.body;

  // Configuración del transportador de Nodemailer con mejoras en la configuración
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "diegoruben171@gmail.com", // Tu correo
      pass: "plezoizhyjgjwqys", // Contraseña de aplicación
    },
    tls: {
      rejectUnauthorized: false // Esto permite conexiones con certificados no verificados (útil en entornos de desarrollo)
    }
  });

  // Opciones del correo
  const mailOptions = {
    from: email || "diegoruben171@gmail.com", // Si no se proporciona correo, usa el predeterminado
    to: recipient, // Correo al que se enviará el mensaje
    subject: subject,
    text: `De: ${name || "Anónimo"}\nCorreo: ${email || "No especificado"}\n\n${message}`,
  };

  try {
    // Enviar correo
    await transporter.sendMail(mailOptions);
    res.status(200).send("Correo enviado correctamente.");
  } catch (error) {
    // Manejo detallado del error
    console.error("Error al enviar el correo:", error);
    res.status(500).send(`Error al enviar el correo: ${error.message}`);
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
