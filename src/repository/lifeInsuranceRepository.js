const db = require("../database/models");

const createLifeInsurance = async(req) => {
    try {
        const lifeInsurance = await db.models.seguro_vida.create({
            asegurado:req.body.asegurado,
            tipo_seguro:req.body.tipo_seguro,
            monto_asegurado:req.body.monto_asegurado,
            prima:req.body.datos_seguro.prima,
            cantidad:req.body.datos_seguro.cantidad,
            company:req.body.datos_seguro.company
        });
        return lifeInsurance;
    } catch (error) {
        console.log("Error de create seguro de vida");
        console.log(error);
    };
};

module.exports = createLifeInsurance;