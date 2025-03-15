const db = require("../database/models");

const createEducation = async(req) => {
    try {
        const education = await db.models.educacion.create({
            ahorros_educacion:req.body.educacion.ahorros_educacion,
            universidad:req.body.educacion.universidad,
            ahorro_mensual:req.body.educacion.ahorro_mensual,
            instrumento_ahorro:req.body.educacion.instrumento_ahorro,
            monto_acumulado:req.body.educacion.monto_acumulado,
            capacidad_ahorro:req.body.educacion.capacidad_ahorro
        });
        return education;
    } catch (error) {
        console.log("Error de create education");
        console.log(error);
    };
};

module.exports = createEducation;