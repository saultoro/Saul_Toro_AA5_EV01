// Importar librerías
const express = require('express');
const cors = require('cors');

// Crear aplicación
const app = express();

// Permitir recibir JSON
app.use(express.json());
app.use(cors());

// Lista temporal de usuarios
let usuarios = [];

/*
 Registro de usuario
*/
app.post('/registro', (req, res) => {

    const { usuario, password } = req.body;

    usuarios.push({
        usuario,
        password
    });

    res.json({
        mensaje: 'Usuario registrado correctamente'
    });

});

/*
 Inicio de sesión
*/
app.post('/login', (req, res) => {

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

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor ejecutándose en puerto 3000');
});