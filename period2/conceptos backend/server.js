const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const helmet = require('helmet');
const redis = require('redis');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

// Configuración de la base de datos MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false, // Desactiva el logging de Sequelize
});

// Modelo de Usuario
const Usuario = sequelize.define('Usuario', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
});

// Configuración de Redis
let client;
(async () => {
    try {
        client = redis.createClient();
        await client.connect();
        console.log('Conexión a Redis exitosa');
    } catch (err) {
        console.error('Error al conectar con Redis:', err.message);
        client = null; // Si Redis no está disponible, se asigna null
    }
})();

// Middleware para verificar el token
function verificarToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ mensaje: "Token requerido :(" });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ mensaje: "Token invalido :(" });
        req.usuario = decoded; // Decodifica el token y asigna el usuario
        next();
    });
}

// Ruta para registrar un usuario
app.post('/registrar', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        await Usuario.create({ nombre, email, password: hashedPassword });
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar usuario', error });
    }
});

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ where: { email: req.body.email } });
        if (!usuario || !bcrypt.compareSync(req.body.password, usuario.password))
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });

        const token = jwt.sign({ id: usuario.id }, process.env.SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
    }
});

// Ruta para obtener el perfil del usuario
app.get('/perfil', verificarToken, async (req, res) => {
    try {
        if (client) {
            const cachePerfil = await client.get(`usuario_${req.usuario.id}`);
            if (cachePerfil)
                return res.json({ fromCache: true, usuario: JSON.parse(cachePerfil) });
        }

        const usuario = await Usuario.findByPk(req.usuario.id, { attributes: ['nombre', 'email'] });
        if (client) {
            await client.setEx(`usuario_${req.usuario.id}`, 3600, JSON.stringify(usuario));
        }
        res.json({ fromCache: false, usuario });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener perfil', error });
    }
});

// Sincronizar la base de datos y arrancar el servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor seguro corriendo en puerto ${PORT}`);
    });
}).catch((err) => {
    console.error('Error al sincronizar la base de datos:', err.message);
});