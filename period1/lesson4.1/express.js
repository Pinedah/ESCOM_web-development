
const express = require('express')
const app = express();
app.use(express.json());

let usuarios = [{id: 1, nombre: 'Juan'}, {id: 2, nombre: 'Ana'}];

app.get('/usuarios', (req, res) =>{
    res.json(usuarios)
});

app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {id: usuarios.length + 1, nombre: req.body.nombre};
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});
//app.listen(3000, ()=> console.log('server corriendo en http://localhost:3000'))

app.get('/agregar', (req, res) => {
    const nombre = req.query.nombre;
    if (!nombre) {
        return res.status(400).json({ error: 'Falta el nombre en la URL' });
    }
    const nuevoUsuario = { id: usuarios.length + 1, nombre };
    usuarios.push(nuevoUsuario);
    res.json(nuevoUsuario);
});
app.listen(3000, () => console.log('server corriendo en http://localhost:3000'));