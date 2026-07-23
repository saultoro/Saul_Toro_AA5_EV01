// Datos temporales del sistema

let usuarios = [];

let conductores = [];

let vehiculos = [];

let viajes = [];

let pagos = [];


// Contadores para generar IDs automáticamente

let contadores = {
    conductor: 1,
    vehiculo: 1,
    viaje: 1,
    pago: 1
};


// Exportar los datos

module.exports = {
    usuarios,
    conductores,
    vehiculos,
    viajes,
    pagos,
    contadores
};