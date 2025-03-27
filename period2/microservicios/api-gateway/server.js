const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

// Ruta para usuarios
app.get('/usuarios', async (req, res) => {
    try{
        const response = await axios.get('http://localhost:3001/usuarios');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error en Servicio Usuarios" });
    }
});

// Ruta para productos
app.get('/productos', async (req, res) => {
    try{
        const response = await axios.get('http://localhost:3002/productos');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error en Servicio Productos" });
    }
});

app.listen(port, () => {
    console.log(`API Gateway corriendo en http://localhost:${port}`);
});

