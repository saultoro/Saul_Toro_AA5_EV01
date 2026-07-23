const express = require("express");
const router = express.Router();

const { vehiculos, contadores } = require("../data/datos");


// ======================================
// Registrar vehículo
// POST /vehiculos
// ======================================
router.post("/", (req, res) => {

    const { placa, marca, modelo, tipo, estado } = req.body;


    // Validación de campos obligatorios
    if (!placa || !marca || !modelo || !tipo || !estado) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }


    // Crear nuevo vehículo
    const nuevoVehiculo = {
        id: contadores.vehiculo++,
        placa,
        marca,
        modelo,
        tipo,
        estado
    };


    // Guardar vehículo
    vehiculos.push(nuevoVehiculo);


    res.status(201).json({
        mensaje: "Vehículo registrado correctamente",
        vehiculo: nuevoVehiculo
    });

});


// ======================================
// Listar vehículos
// GET /vehiculos
// ======================================
router.get("/", (req, res) => {

    res.json(vehiculos);

});

// ======================================
// Buscar vehículo por ID
// GET /vehiculos/:id
// ======================================
router.get("/:id", (req, res) => {

    const id = parseInt(req.params.id);


    const vehiculo = vehiculos.find(
        v => v.id === id
    );


    if (!vehiculo) {
        return res.status(404).json({
            mensaje: "Vehículo no encontrado"
        });
    }


    res.json(vehiculo);

});

// ======================================
// Actualizar vehículo
// PUT /vehiculos/:id
// ======================================
router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);


    const vehiculo = vehiculos.find(
        v => v.id === id
    );


    if (!vehiculo) {
        return res.status(404).json({
            mensaje: "Vehículo no encontrado"
        });
    }


    const { placa, marca, modelo, tipo, estado } = req.body;


    // Actualizar solamente los datos enviados
    if (placa) vehiculo.placa = placa;
    if (marca) vehiculo.marca = marca;
    if (modelo) vehiculo.modelo = modelo;
    if (tipo) vehiculo.tipo = tipo;
    if (estado) vehiculo.estado = estado;


    res.json({
        mensaje: "Vehículo actualizado correctamente",
        vehiculo
    });

});

// ======================================
// Eliminar vehículo
// DELETE /vehiculos/:id
// ======================================
router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);


    const indice = vehiculos.findIndex(
        v => v.id === id
    );


    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Vehículo no encontrado"
        });
    }


    const vehiculoEliminado = vehiculos.splice(indice, 1);


    res.json({
        mensaje: "Vehículo eliminado correctamente",
        vehiculo: vehiculoEliminado[0]
    });

});

module.exports = router;