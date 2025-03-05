const express = require('express');
const Usuario = require('../models/Usuario');
const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});

router.get('/:boleta', async (req, res) => {
    try {
        const boleta = req.params.boleta;
        const usuario = await Usuario.findOne({ where: { boleta } });
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
    try {
        await Usuario.update(req.body, { where: { id: req.params.id } });
        res.json({ mensaje: 'Usuario actualizado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar un usuario
router.delete('/:boleta', async (req, res) => {
    try {
        const boleta = req.params.boleta;
        const usuario = await Usuario.findOne({ where: { boleta } });
        if (usuario) {
            await Usuario.destroy({ where: { boleta } });
            res.json({ mensaje: 'Usuario eliminado con éxito' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;