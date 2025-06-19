const http = require('http');
const express = require('express');
const app = express();

const server = http.createServer((req, res) => {
    console.log(`Solicitud recibida: ${req.method} ${req.url}`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('Servidor en Node.js</h1>');
});

/*
server.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
}
*/

app.use(express.static('public'));

app.listen(3001, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});