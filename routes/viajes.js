const express = require("express");
const router = express.Router();

const { viajes, contadores } = require("../data/datos");


// ======================================
// Registrar viaje
// POST /viajes
// ======================================
router.post("/", (req, res) => {

    const { usuario, conductor, origen, destino, estado } = req.body;


    if (!usuario || !conductor || !origen || !destino || !estado) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }


    const nuevoViaje = {
        id: contadores.viaje++,
        usuario,
        conductor,
        origen,
        destino,
        estado
    };


    viajes.push(nuevoViaje);


    res.status(201).json({
        mensaje: "Viaje registrado correctamente",
        viaje: nuevoViaje
    });

});


// ======================================
// Listar viajes
// GET /viajes
// ======================================
router.get("/", (req, res) => {

    res.json(viajes);

});


// ======================================
// Buscar viaje por ID
// GET /viajes/:id
// ======================================
router.get("/:id", (req, res) => {

    const id = parseInt(req.params.id);


    const viaje = viajes.find(
        v => v.id === id
    );


    if (!viaje) {
        return res.status(404).json({
            mensaje: "Viaje no encontrado"
        });
    }


    res.json(viaje);

});


// ======================================
// Actualizar viaje
// PUT /viajes/:id
// ======================================
router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);


    const viaje = viajes.find(
        v => v.id === id
    );


    if (!viaje) {
        return res.status(404).json({
            mensaje: "Viaje no encontrado"
        });
    }


    const { usuario, conductor, origen, destino, estado } = req.body;


    if (usuario) viaje.usuario = usuario;
    if (conductor) viaje.conductor = conductor;
    if (origen) viaje.origen = origen;
    if (destino) viaje.destino = destino;
    if (estado) viaje.estado = estado;


    res.json({
        mensaje: "Viaje actualizado correctamente",
        viaje
    });

});


// ======================================
// Eliminar viaje
// DELETE /viajes/:id
// ======================================
router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);


    const indice = viajes.findIndex(
        v => v.id === id
    );


    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Viaje no encontrado"
        });
    }


    const viajeEliminado = viajes.splice(indice, 1);


    res.json({
        mensaje: "Viaje eliminado correctamente",
        viaje: viajeEliminado[0]
    });

});


module.exports = router;