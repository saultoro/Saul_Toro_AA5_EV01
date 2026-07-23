const express = require("express");
const router = express.Router();

const { pagos, contadores } = require("../data/datos");


// ======================================
// Registrar pago
// POST /pagos
// ======================================
router.post("/", (req, res) => {

    const { viajeId, valor, metodo, estado } = req.body;


    if (!viajeId || !valor || !metodo || !estado) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }


    const nuevoPago = {
        id: contadores.pago++,
        viajeId,
        valor,
        metodo,
        estado
    };


    pagos.push(nuevoPago);


    res.status(201).json({
        mensaje: "Pago registrado correctamente",
        pago: nuevoPago
    });

});


// ======================================
// Listar pagos
// GET /pagos
// ======================================
router.get("/", (req, res) => {

    res.json(pagos);

});


// ======================================
// Buscar pago por ID
// GET /pagos/:id
// ======================================
router.get("/:id", (req, res) => {

    const id = parseInt(req.params.id);


    const pago = pagos.find(
        p => p.id === id
    );


    if (!pago) {
        return res.status(404).json({
            mensaje: "Pago no encontrado"
        });
    }


    res.json(pago);

});


// ======================================
// Actualizar pago
// PUT /pagos/:id
// ======================================
router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);


    const pago = pagos.find(
        p => p.id === id
    );


    if (!pago) {
        return res.status(404).json({
            mensaje: "Pago no encontrado"
        });
    }


    const { viajeId, valor, metodo, estado } = req.body;


    if (viajeId) pago.viajeId = viajeId;
    if (valor) pago.valor = valor;
    if (metodo) pago.metodo = metodo;
    if (estado) pago.estado = estado;


    res.json({
        mensaje: "Pago actualizado correctamente",
        pago
    });

});


// ======================================
// Eliminar pago
// DELETE /pagos/:id
// ======================================
router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);


    const indice = pagos.findIndex(
        p => p.id === id
    );


    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Pago no encontrado"
        });
    }


    const pagoEliminado = pagos.splice(indice, 1);


    res.json({
        mensaje: "Pago eliminado correctamente",
        pago: pagoEliminado[0]
    });

});


module.exports = router;