const express = require('express');
const cors = require('cors');   
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenido a la API segura');
});

app.post('/login', (req, res) => {
    const { usuario, password } = req.body;
    if (usuario === 'admin' && password === '1234') {
        const token = jwt.sign({ usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } 
    res.status(401).json({ error: 'Credenciales Incorrectas' });
});

function verificarToken(req, res, next){
    const token = req.headers['authorization'];
    if(!token) return res.status(403).json({mensaje: "Token requerido :("});
    
    //jwt.verify(token, "patata", (err, decoded) => { 
    // si se utiliza una variable diferente 
    // a la establecida en el .env, no se verificara el token, ya que esta depende de la clave secreta
    // establecida al momento de firmar el token.
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // 
        if(err) return res.status(401).json({mensaje: "Token invalido :("});
        req.usuario = decoded.usuario;
        next();
    });
}

app.get('/perfil', verificarToken, (req, res) => {
    res.json({ mensaje: `Bienvenido ${req.usuario}, estás autenticado` });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


