const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const Usuario = require('./models/Usuario');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/delete', (req, res) => {
    res.sendFile(path.join(__dirname, 'delete.html'));
});
app.get('/update', (req, res) => {
    res.sendFile(path.join(__dirname, 'update.html'));
});
app.get('/read', (req, res) => {
    res.sendFile(path.join(__dirname, 'read.html'));
});

// Rutas
app.use('/usuarios', require('./routes/usuarios'));

// Sincronizar la base de datos y levantar el servidor
sequelize.sync()
    .then(() => {
        console.log('Base de datos sincronizada');
        app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
    })
    .catch(error => console.error('Error al sincronizar la base de datos: ', error));