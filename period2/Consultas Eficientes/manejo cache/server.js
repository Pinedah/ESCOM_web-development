const express = require('express');
const redis = require('redis');
const cors = require('cors');
const app = express();
const port = 3000;

// const client = redis.createClient();
const client = redis.createClient({
    socket: {host: 'redis', port: 6379},
    retry_strategy: (options) => {
        console.log("No se pudo conectar a Redis. Revisar si esta en ejecución.");
        process.exit(1);
    }
});

client.on('error', (err) => {
    console.log('Redis error: ', err);
});

(async() => {
    try {
        await client.connect();
        console.log('Conectado a Redis');
    } catch (error) {
        console.error('Error conectando a Redis', error);
    }
})();

app.use(express.json()); // Middleware para procesar json
app.use(cors()); // Permitir CORS

// Ruta con cache para Redis
app.get('/data', async (req, res) => {
    try {
        // Intentar obtener datos desde cache
        const cachedData = await client.get('data');
        if (cachedData) {
            console.log('Datos obtenidos desde cache');
            return res.json({ fromCache: true, data: JSON.parse(cachedData) });
        }
        // Si no está en cache, se simula consulta a la BD
        const newData = { mensaje: 'Datos desde la base de datos' };

        // Guardar en cache por 60 minutos (3600 segundos)
        await client.setEx('data', 3600, JSON.stringify(newData));
        res.json({ fromCache: false, data: newData });
    } catch (error) {
        res.status(500).json({ error: 'Error en Redis o en la consulta' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});