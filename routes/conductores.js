const express = require("express");
const router = express.Router();

const { conductores, contadores } = require("../data/datos");


// ======================================
// Registrar conductor
// POST /conductores
// ======================================
router.post("/", (req, res) => {

    const { nombre, placa, vehiculo, estado } = req.body;


    // Validación de campos obligatorios
    if (!nombre || !placa || !vehiculo || !estado) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }


    // Crear nuevo conductor
    const nuevoConductor = {
        id: contadores.conductor++,
        nombre,
        placa,
        vehiculo,
        estado
    };


    // Guardar conductor
    conductores.push(nuevoConductor);


    res.status(201).json({
        mensaje: "Conductor registrado correctamente",
        conductor: nuevoConductor
    });

});


// ======================================
// Listar todos los conductores
// GET /conductores
// ======================================
router.get("/", (req, res) => {

    res.json(conductores);

});


// ======================================
// Buscar conductor por ID
// GET /conductores/:id
// ======================================
router.get("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const conductor = conductores.find(
        c => c.id === id
    );


    if (!conductor) {
        return res.status(404).json({
            mensaje: "Conductor no encontrado"
        });
    }


    res.json(conductor);

});


// ======================================
// Actualizar conductor
// PUT /conductores/:id
// ======================================
router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const conductor = conductores.find(
        c => c.id === id
    );


    if (!conductor) {
        return res.status(404).json({
            mensaje: "Conductor no encontrado"
        });
    }


    const { nombre, placa, vehiculo, estado } = req.body;


    // Actualizar solamente los campos enviados
    if (nombre) conductor.nombre = nombre;
    if (placa) conductor.placa = placa;
    if (vehiculo) conductor.vehiculo = vehiculo;
    if (estado) conductor.estado = estado;


    res.json({
        mensaje: "Conductor actualizado correctamente",
        conductor
    });

});

// ======================================
// Eliminar conductor
// DELETE /conductores/:id
// ======================================
router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);


    const indice = conductores.findIndex(
        c => c.id === id
    );


    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Conductor no encontrado"
        });
    }


    const conductorEliminado = conductores.splice(indice, 1);


    res.json({
        mensaje: "Conductor eliminado correctamente",
        conductor: conductorEliminado[0]
    });

});

// Exportar rutas
module.exports = router;