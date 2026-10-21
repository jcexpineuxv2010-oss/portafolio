const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend funcionando');
});

app.post('/contacto', async (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ ok: false, texto: 'Faltan datos' });
  }

  try {
    const respuesta = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Portafolio <onboarding@resend.dev>',
        to: [process.env.EMAIL_DESTINO],
        reply_to: email,
        subject: `Nuevo mensaje de contacto de: ${nombre}`,
        text: `Nombre: ${nombre}\nCorreo: ${email}\nTeléfono: ${telefono}\n\nMensaje:\n${mensaje}`
      })
    });

    if (!respuesta.ok) {
      console.error('Error de Resend:', await respuesta.text());
      return res.status(500).json({ ok: false, texto: 'No se pudo enviar' });
    }

    res.json({ ok: true, texto: 'Mensaje enviado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, texto: 'Error del servidor' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
