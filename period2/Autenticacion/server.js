const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

const SECRET_KEY = "clave_secreta";

// Hashea la contraseña antes de almacenarla
const usuarios = [
    {
        id: 1,
        nombre: "Panke",
        email: "panke@example.com",
        password: bcrypt.hashSync("pankesito", 11) // Se guarda encriptada
    }
];

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const usuario = usuarios.find(u => u.email === email);
    
    console.log("Contraseña ingresada:", password);
    console.log("Contraseña almacenada (hash):", usuario.password);
    console.log("Comparación:", bcrypt.compareSync(password, usuario.password));
    
    if (!usuario) {
        return res.status(401).json({ mensaje: "Usuario no encontrado" });
    }

    if (!bcrypt.compareSync(password, usuario.password)) {
        return res.status(401).json({ mensaje: "Credenciales incorrectas :(" });
    }

    console.log("Usuario encontrado");
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET_KEY, {
        expiresIn: '1h'
    });

    console.log("Token generado:", token);
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

app.get('/perfil', verificarToken, (req, res) => {
    res.json({ mensaje: `Acceso concedido`, usuario: req.usuario });
});

app.get('/test', (req, res) => {
    res.json({ mensaje: "Ruta de prueba" });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
