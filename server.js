// Importar librerías
const express = require('express');
const conductoresRoutes = require("./routes/conductores");
const vehiculosRoutes = require("./routes/vehiculos");
const viajesRoutes = require("./routes/viajes");
const pagosRoutes = require("./routes/pagos");
const cors = require('cors');

// Crear aplicación
const app = express();

// Configuración
app.use(express.json());
app.use(cors());

// Importar rutas
const usuariosRoutes = require('./routes/usuarios');

// Usar las rutas
app.use('/', usuariosRoutes);
app.use("/conductores", conductoresRoutes);
app.use("/vehiculos", vehiculosRoutes);
app.use("/viajes", viajesRoutes);
app.use("/pagos", pagosRoutes);

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor ejecutándose en puerto 3000');
});