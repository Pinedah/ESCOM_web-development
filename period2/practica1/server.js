const express = require('express');
const app = express();
const port = 3000;

// Middleware para procesar json
app.use(express.json());

let usuarios = [
    {id: 1, nombre: 'Juan', email: "juan@example.com"},
    {id: 2, nombre: 'Ana', email: "ana@example.com"}
];

// 1. GET - Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    res.status(200).json(usuarios); 
});

// 2. GET - Obtener un usuario por id
app.get('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) 
        return res.status(404).json({mensaje: "Usuario no encontrado"});
    res.status(200).json(usuario);
});

// 3. POST - Agregar un nuevo usuario
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        email: req.body.email
    };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

// 4. PUT - Modificar un usuario existente
app.put('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) 
        return res.status(404).json({mensaje: "Usuario no encontrado"});
    
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    res.status(200).json(usuario);
});

// 5. DELETE - Eliminar un usuario por ID
app.delete('/usuarios/:id', (req, res) => {
    const index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) 
        return res.status(404).json({mensaje: "Usuario no encontrado"});

    usuarios.splice(index, 1);
    res.status(204).send(); // no devuelve contenido
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


