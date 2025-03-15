const db = require("../database/models");

const createDisability = async(req) => {
    try {
        const disability = await db.models.invalidez.create({
            percepcion_ingreso:req.body.invalidez.percepcion_ingreso,
            modo_ingreso:req.body.invalidez.modo_ingreso,
            tiempo_alcanze_economico:req.body.invalidez.tiempo_alcanze_economico,
            dependencia:req.body.invalidez.dependencia
        });
        return disability;
    } catch (error) {
        console.log("Error de create disability");
        console.log(error);
    };
};

module.exports = createDisability