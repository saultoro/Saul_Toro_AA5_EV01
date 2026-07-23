const express = require('express');
const router = express.Router();

// Importar los datos
const { usuarios } = require('../data/datos');

/*
 Registro de usuario
*/
router.post('/registro', (req, res) => {

    const { usuario, password } = req.body;

    // Validar campos obligatorios
    if (!usuario || !password) {
        return res.status(400).json({
            mensaje: 'Debe ingresar usuario y contraseña'
        });
    }

    // Verificar si el usuario ya existe
    const existe = usuarios.find(
        u => u.usuario.toLowerCase() === usuario.toLowerCase()
    );

    if (existe) {
        return res.status(409).json({
            mensaje: 'El usuario ya se encuentra registrado'
        });
    }

    // Registrar usuario
    usuarios.push({
        usuario,
        password
    });

    res.status(201).json({
        mensaje: 'Usuario registrado correctamente'
    });

});
/*
 Inicio de sesión
*/
router.post('/login', (req, res) => {

    const { usuario, password } = req.body;

    const existe = usuarios.find(
        u =>
        u.usuario === usuario &&
        u.password === password
    );

    if (existe) {

        res.json({
            mensaje: 'Autenticación satisfactoria'
        });

    } else {

        res.status(401).json({
            mensaje: 'Error en la autenticación'
        });

    }

});

/*
 Listar usuarios
*/
router.get('/usuarios', (req, res) => {

    res.json(usuarios);

});

module.exports = router;