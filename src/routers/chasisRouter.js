const express = require('express');
const multer = require('multer');
const chasisRouter = express.Router();
const authorizado =  require("../middlewares/authMiddleware");
const { processChasisFiles } = require('../controllers/chasisController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configuración para manejar múltiples campos de archivos
const uploadDual = multer({ storage: storage }).fields([
    { name: 'fileImagina', maxCount: 1 },
    { name: 'filePension', maxCount: 1 }
]);

// Ruta original actualizada para usar processChasisFiles
chasisRouter.post('/:chasisNumber/:fileType', authorizado, upload.single('file'), processChasisFiles);

// Rutas adicionales para compatibilidad con estructura anterior
chasisRouter.post('/:chasisNumber/year/:year/:fileType', authorizado, upload.single('file'), processChasisFiles);

// IMPORTANTE: El orden de las rutas es crucial - las más específicas deben ir primero

// Ruta especial para Imagina Ser (carga dual) - DEBE IR ANTES de la ruta genérica
chasisRouter.post('/:chasisNumber/type/imaginaser/payment/:payment/:fileType', authorizado, uploadDual, processChasisFiles);

// Ruta especial para Protección - Extraer fileType del payment
chasisRouter.post('/:chasisNumber/type/proteccion/payment/:payment', authorizado, upload.single('file'), (req, res, next) => {
    // Derivar el fileType del payment
    const payment = req.params.payment;
    req.params.fileType = payment === '10' ? 'P10' : payment === '20' ? 'P20' : 'P' + payment;
    return processChasisFiles(req, res);
});

// Ruta estándar para carga de un solo archivo - VA DESPUÉS de las rutas específicas
chasisRouter.post('/:chasisNumber/type/:type/payment/:payment/:fileType', authorizado, upload.single('file'), processChasisFiles);

module.exports = chasisRouter;       