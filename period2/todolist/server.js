const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());
app.use(express.static('public')); // Sirve archivos estáticos (index.html, style.css, script.js)

const SECRET_KEY = "clave_secreta";

// Configuración de la base de datos
const sequelize = new Sequelize('mysql://root:panke@localhost:3306/todolist');

// Modelos
const Usuario = sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    rol: { type: DataTypes.STRING, allowNull: false, defaultValue: 'usuario' } // 'usuario' o 'admin'
});

const Tarea = sequelize.define('Tarea', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: { type: DataTypes.STRING, allowNull: false },
    completada: { type: DataTypes.BOOLEAN, defaultValue: false },
    usuarioId: { type: DataTypes.INTEGER, allowNull: false }
});

// Relaciones
Usuario.hasMany(Tarea, { foreignKey: 'usuarioId' });
Tarea.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Rutas
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
        return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

function verificarToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ mensaje: "Acceso denegado" });

    try {
        const verificado = jwt.verify(token.split(" ")[1], SECRET_KEY);
        req.usuario = verificado;
        next();
    } catch (error) {
        res.status(400).json({ mensaje: "Token inválido" });
    }
}

app.get('/tareas', verificarToken, async (req, res) => {
    const { rol, id } = req.usuario;

    if (rol === 'admin') {
        const tareas = await Tarea.findAll();
        return res.json(tareas);
    }

    const tareas = await Tarea.findAll({ where: { usuarioId: id } });
    res.json(tareas);
});

app.post('/tareas', verificarToken, async (req, res) => {
    const { descripcion } = req.body;
    const { id } = req.usuario;

    const tarea = await Tarea.create({ descripcion, usuarioId: id });
    res.json(tarea);
});

// Sincronizar base de datos y arrancar el servidor
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor corriendo en http://localhost:3000');
    });
});