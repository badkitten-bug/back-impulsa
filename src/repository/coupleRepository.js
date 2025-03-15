const db = require("../database/models");

const createCouple = async (req) => {
    try {
        const couple = await db.models.pareja.create({
            nombreApellido:req.body.conyuge.nombreApellidoPareja,
            ocupacion:req.body.conyuge.ocupacionPareja,
            fecha_nacimiento:req.body.conyuge.fecha_nacimiento_pareja
        });
        return couple;  
    } catch (error) {
       console.log("Error de create couple");
       console.log(error);   
    }
};

module.exports = createCouple;