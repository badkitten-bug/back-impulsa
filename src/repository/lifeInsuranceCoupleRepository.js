const db = require("../database/models");

const createLifeInsuranceCouple = async(req) => {
    try {
        const lifeInsuranceCouple = await db.models.seguro_vida_pareja.create({
            asegurado:req.body.asegurado_pareja,
            tipo_seguro:req.body.tipo_seguro_pareja,
            monto_asegurado:req.body.datos_seguro_pareja.monto_asegurado_pareja,
            prima:req.body.datos_seguro_pareja.prima_pareja,
            cantidad:req.body.datos_seguro_pareja.cantidad_pareja,
            company:req.body.datos_seguro_pareja.company_pareja
        });
        return lifeInsuranceCouple;
    } catch (error) {
        console.log("Error de create seguro de vida pareja");
        console.log(error);
    };  
};

module.exports = createLifeInsuranceCouple;