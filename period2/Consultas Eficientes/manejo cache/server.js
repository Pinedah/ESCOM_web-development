const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Simulación de almacenamiento en memoria para la caché
const cache = new Map();

app.use(express.json()); // Middleware para procesar JSON
app.use(cors()); // Permitir CORS

// Ruta con caché en memoria
app.get('/data', async (req, res) => {
    try {
        // Intentar obtener datos desde la caché
        if (cache.has('data')) {
            console.log('Datos obtenidos desde la caché');
            return res.json({ fromCache: true, data: cache.get('data') });
        }

        // Si no está en la caché, se simula una consulta a la base de datos
        const newData = { mensaje: 'Datos desde la base de datos' };

        // Guardar en la caché por 60 minutos (3600 segundos)
        cache.set('data', newData);
        setTimeout(() => cache.delete('data'), 3600 * 1000); // Eliminar después de 1 hora

        res.json({ fromCache: false, data: newData });
    } catch (error) {
        res.status(500).json({ error: 'Error en la consulta' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});