
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');


const app = express();
const port = 3000;

// Configurar la sesión
app.use(session({ secret: 'faxinaar', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Configurar la estrategia de Google
passport.use(new GoogleStrategy({
    clientID: 'your-client-id',
    clientSecret: 'your-client-secret',
    callbackURL: '/auth/google/callback',
    }, (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }
));

// Serializar y deserializar el usuario
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Rutas de autenticación
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => res.redirect('/perfil'));

// Ruta de perfil
app.get('/perfil', (req, res) => {
    if (!req.isAuthenticated()) 
        return res.status(401).json({ mensaje: 'No autenticado' });
    res.json({ usuario: req.user });
});

// Ruta de prueba
app.get('/test', (req, res) => {
    res.json({ mensaje: "Ruta de prueba" });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});