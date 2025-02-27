const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Para procesar JSON enviado en las peticiones

let usuarios = [
    { id: 1, nombre: 'Panke', apellido: "Pineda", edad: 20, boleta: 2024630023, correo: "panke.pineda@ipn.mx", domicilio: "ecatepec xd" }, 
    { id: 2, nombre: 'Faxinaar', apellido: "Nava", edad: 28, boleta: 1234567890, correo: "faxinaar.nava@unam.mx", domicilio: "ecatepec xd" }
];

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// Ruta para agregar un nuevo usuario
app.post('/agregar', (req, res) => {
    const { nombre, apellido, edad, boleta, correo, domicilio } = req.body;

    if (!nombre || !apellido || !edad || !boleta || !correo || !domicilio) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre,
        apellido,
        edad: parseInt(edad),
        boleta: parseInt(boleta),
        correo,
        domicilio
    };

    usuarios.push(nuevoUsuario);
    res.json({ mensaje: 'Usuario registrado con éxito', usuario: nuevoUsuario });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
