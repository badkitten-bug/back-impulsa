const axios = require('axios');
const FormData = require('form-data');
require("dotenv").config();

// Función para enviar un solo archivo
const sendFileToPython = async (req, res) => {
    try {
        console.log("Petición recibida con parámetros:", req.params);
        console.log("Archivos recibidos:", req.file ? req.file.originalname : "Ninguno");
        
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const chasisNumber = parseInt(req.params.chasisNumber);

        if (!chasisNumber) {
            return res.status(400).json({ message: "Chasis number is required" });
        }

        // Obtener el file_type desde los parámetros
        const fileType = req.params.fileType;
        
        if (!fileType) {
            return res.status(400).json({ message: "File type is required" });
        }

        console.log(`Procesando archivo para chasis ${chasisNumber} con tipo ${fileType}`);

        const formData = new FormData();
        formData.append('file', file.buffer, {
            filename: file.originalname,
            contentType: 'multipart/form-data'
        });
    
        let url;
        switch (chasisNumber) {
            case 1:
                url = process.env.BACK_PYTHON + `/AseguradoraImpulsa/educacion/upload/${fileType}`;
                break;
            case 2:
                url = process.env.BACK_PYTHON + `/AseguradoraImpulsa/ahorro/upload/${fileType}`;
                break;
            case 3:
                url = process.env.BACK_PYTHON + `/AseguradoraImpulsa/retiro-pension/upload/${fileType}`;
                break;
            case 4:
                url = process.env.BACK_PYTHON + `/AseguradoraImpulsa/proteccion/upload/${fileType}`;
                break;
            case 5:
                url = process.env.BACK_PYTHON + `/AseguradoraImpulsa/empresarial/upload/${fileType}`;
                break;
            default:
                url = process.env.BACK_PYTHON + `/AseguradoraImpulsa/inversiones/upload/${fileType}`;
                break;
        }

        console.log(`Enviando petición a: ${url}`);

        // Enviar el archivo al servidor Django
        const pythonServerResponse = await axios.post(url, formData, {
            headers: {
                ...formData.getHeaders()
            },
            responseType: 'arraybuffer' 
        });        

        // Extraer el nombre del archivo del encabezado 'Content-Disposition'
        const contentDisposition = pythonServerResponse.headers['content-disposition'];
        let filenameExcel = 'file.xlsx';
        console.log("====> content-disposition", contentDisposition);

        if (contentDisposition) {
            // Usar una expresión regular para extraer el nombre del archivo
            const matches = /filename=([^;]*)/.exec(contentDisposition);
            if (matches) {
                filenameExcel = matches[1].replace(/"/g, '');
            }
        }

        console.log(`Enviando respuesta con archivo: ${filenameExcel}`);

        // Configurar los encabezados para la descarga del archivo Excel
        res.setHeader('Content-Disposition', `attachment; filename=${filenameExcel}`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(pythonServerResponse.data);
    } catch (error) {
        console.error("Error en el procesamiento:", error);
        
        // Detalles más específicos para errores de axios
        if (error.response) {
            // La petición se hizo y el servidor respondió con un código de estado
            console.error("Error en la respuesta:", {
                status: error.response.status,
                headers: error.response.headers,
                data: error.response.data ? (error.response.data.toString ? error.response.data.toString() : "No se puede mostrar") : "Sin datos"
            });
            return res.status(error.response.status).json({
                message: "Error en la respuesta del servidor Python",
                serverError: error.response.data ? (error.response.data.toString ? error.response.data.toString() : "No se puede mostrar") : "Sin datos"
            });
        } else if (error.request) {
            // La petición se hizo pero no se recibió respuesta
            console.error("No se recibió respuesta:", error.request);
            return res.status(503).json({
                message: "No se pudo conectar con el servidor Python",
                serverError: "No se recibió respuesta del servidor"
            });
        } else {
            // Algo sucedió al configurar la petición
            console.error("Error en la petición:", error.message);
            return res.status(500).json({
                message: "Error al procesar la petición",
                serverError: error.message
            });
        }
    }
}

// Nueva función para enviar dos archivos (Imagina Ser)
const sendDualFilesToPython = async (req, res) => {
    try {
        console.log("Petición dual recibida con parámetros:", req.params);
        console.log("Archivos recibidos:", 
            req.files.fileImagina ? req.files.fileImagina[0].originalname : "No hay archivo Imagina Ser",
            req.files.filePension ? req.files.filePension[0].originalname : "No hay archivo Pensiones");
        
        // Verificar que ambos archivos estén presentes
        if (!req.files || !req.files.fileImagina || !req.files.filePension) {
            return res.status(400).json({ message: "Se requieren ambos archivos (Imagina Ser y Pensiones)" });
        }

        const fileImagina = req.files.fileImagina[0];
        const filePension = req.files.filePension[0];
        const chasisNumber = parseInt(req.params.chasisNumber);
        const fileType = req.params.fileType;
        
        if (!chasisNumber) {
            return res.status(400).json({ message: "Chasis number is required" });
        }
        
        if (!fileType) {
            return res.status(400).json({ message: "File type is required" });
        }

        console.log(`Procesando archivos duales para chasis ${chasisNumber} con tipo ${fileType}`);

        // Crear un FormData con ambos archivos
        const formData = new FormData();
        formData.append('fileImagina', fileImagina.buffer, {
            filename: fileImagina.originalname,
            contentType: 'multipart/form-data'
        });
        
        formData.append('filePension', filePension.buffer, {
            filename: filePension.originalname,
            contentType: 'multipart/form-data'
        });
    
        // Determinar la URL correcta según el chasisNumber
        let url;
        if (chasisNumber === 3) {
            // Para Retiro y Pensión (chasisNumber 3)
            url = process.env.BACK_PYTHON + `/AseguradoraImpulsa/retiro-pension/upload/dual/${fileType}`;
        } else if (chasisNumber === 6) {
            // Para Inversiones (chasisNumber 6)
            url = process.env.BACK_PYTHON + `/AseguradoraImpulsa/inversiones/upload/dual/${fileType}`;
        } else {
            // URL genérica para otros casos
            url = process.env.BACK_PYTHON + `/AseguradoraImpulsa/chasis/${chasisNumber}/upload/dual/${fileType}`;
        }

        console.log(`Enviando petición dual a: ${url}`);

        // Enviar los archivos al servidor Django
        const pythonServerResponse = await axios.post(url, formData, {
            headers: {
                ...formData.getHeaders()
            },
            responseType: 'arraybuffer' 
        });        

        // Extraer el nombre del archivo del encabezado 'Content-Disposition'
        const contentDisposition = pythonServerResponse.headers['content-disposition'];
        let filenameExcel = 'chasis_imaginaser.xlsx';
        console.log("====> content-disposition", contentDisposition);

        if (contentDisposition) {
            // Usar una expresión regular para extraer el nombre del archivo
            const matches = /filename=([^;]*)/.exec(contentDisposition);
            if (matches) {
                filenameExcel = matches[1].replace(/"/g, '');
            }
        }

        console.log(`Enviando respuesta con archivo: ${filenameExcel}`);

        // Configurar los encabezados para la descarga del archivo Excel
        res.setHeader('Content-Disposition', `attachment; filename=${filenameExcel}`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(pythonServerResponse.data);
    } catch (error) {
        console.error("Error en el procesamiento dual:", error);
        
        // Detalles más específicos para errores de axios
        if (error.response) {
            console.error("Error en la respuesta dual:", {
                status: error.response.status,
                headers: error.response.headers,
                data: error.response.data ? (error.response.data.toString ? error.response.data.toString() : "No se puede mostrar") : "Sin datos"
            });
            return res.status(error.response.status).json({
                message: "Error en la respuesta del servidor Python",
                serverError: error.response.data ? (error.response.data.toString ? error.response.data.toString() : "No se puede mostrar") : "Sin datos"
            });
        } else if (error.request) {
            console.error("No se recibió respuesta dual:", error.request);
            return res.status(503).json({
                message: "No se pudo conectar con el servidor Python",
                serverError: "No se recibió respuesta del servidor"
            });
        } else {
            console.error("Error en la petición dual:", error.message);
            return res.status(500).json({
                message: "Error al procesar la petición dual",
                serverError: error.message
            });
        }
    }
}

// Función para determinar qué controlador usar basado en los archivos recibidos
const processChasisFiles = async (req, res) => {
    console.log("Tipo de solicitud recibida:", req.files ? "Múltiples archivos" : "Un solo archivo");
    
    // Si recibimos múltiples archivos (fileImagina y filePension), usamos el controlador dual
    if (req.files && req.files.fileImagina && req.files.filePension) {
        return await sendDualFilesToPython(req, res);
    } 
    // Si solo tenemos un archivo, usamos el controlador estándar
    else if (req.file) {
        return await sendFileToPython(req, res);
    } 
    // Si no hay archivos, devolvemos un error
    else {
        return res.status(400).json({ message: "No se recibieron archivos" });
    }
}

module.exports = {
    sendFileToPython,
    sendDualFilesToPython,
    processChasisFiles
};
