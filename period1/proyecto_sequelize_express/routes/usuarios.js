
const express = require('express');
const Usuario = require('../models/Usuario');
const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    try{
        const usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    }catch(error){
        res.status(400).json({error: error.message});
    }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
    try{
        await Usuario.update(req.body, {where: {id: req.params.id} });
        res.json({mensaje: 'Usuario actualizado'});
    }catch (error){
        res.status(400).json({error: error.message});
    }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
    try{
        await Usuario.destroy({where: {id: req.params.id}});
        res.json({mensaje: 'Usuario eliminado'});
    }catch(error){
        res.status(400).json({error: error.message});
    }
});

module.exports = router;