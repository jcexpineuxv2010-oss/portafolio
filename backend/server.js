const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend funcionando');
});

app.post('/contacto', (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body;
  console.log('Mensaje recibido:', nombre, email, telefono, mensaje);
  res.json({ ok: true, texto: 'Mensaje recibido' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
