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
  const { name, email, subject, message } = req.body;

  // Configuración del transportador de Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "diegoruben171@gmail.com", // Cambia por tu correo de Gmail
      pass: "plez oizh yjgj wqys", // Usa una contraseña de aplicación
    },
  });

  // Opciones del correo
  const mailOptions = {
    from: email,
    to: "diegoruben171@gmail.com", // Correo al que se enviará el mensaje
    subject: `Mensaje de ${name}: ${subject}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Correo enviado correctamente.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al enviar el correo.");
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
