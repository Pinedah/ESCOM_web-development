const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Configurar Multer para guardar en "uploads/"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Middleware para servir HTML
app.use(express.static(__dirname));

// Ruta para procesar la subida
app.post('/upload', upload.single('archivo'), (req, res) => {
  res.send(`Archivo subido: ${req.file.originalname}`);
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000/index.html');
});
