
const express = require('express');
const sequelize = require('./config/database');
const Usuario = require('./models/Usuario');
const app = express();

app.use(express.json());

// Rutas
app.use('/usuarios', require('./routes/usuarios'));

// Sincronizar la base de datos y levantar el servidor 
sequelize.sync()
    .then(() => {
        console.log('Base de datos sincronizada');
        app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
    })
    .catch(error => console.error('Error al sincronizar la base de datos: ', error));

    