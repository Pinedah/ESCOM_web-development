const express = require('express');
const app = express();
const port = 3001;

app.get('/usuarios', (req, res) => {
    res.json([
        { id: 1, nombre: 'Juan Perez' },
        { id: 2, nombre: 'Maria Lopez' },
        ]);
});

app.listen(port, () => {
    console.log(`Servidor de usuarios corriendo en http://localhost:${port}`);
});