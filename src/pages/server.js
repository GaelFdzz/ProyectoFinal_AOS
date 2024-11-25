import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const app = express();
const port = 5000;

app.use(express.json());

// Configura nodemailer para Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'diegoruben171@gmail.com', // Tu correo de Gmail
    pass: 'istv hvkx ffhg qfvu', // Usa la contraseña de aplicación generada
  },
  tls: {
    rejectUnauthorized: false, // A veces necesario para evitar errores SSL
  },
});

// Ruta para enviar el correo
app.post('/send-email', async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: 'diegoruben171@gmail.com', // Tu correo
    to: 'diegoruben171@gmail.com', // El correo al que se enviará
    subject: subject,
    text: `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`,
  };

  try {
    // Envía el correo
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send({ message: 'Hubo un problema al enviar el correo. Inténtalo más tarde.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${5175}`);
});
