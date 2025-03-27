const express = require('express');
const app = express();
const port = 3002;

app.get('/productos', (req, res) => {
    res.json([
        { id: 101, nombre: 'Laptop' },
        { id: 102, nombre: 'Telefono' },
        ]);
});

app.listen(port, () => {
    console.log(`Servidor de productos corriendo en http://localhost:${port}`);
});
