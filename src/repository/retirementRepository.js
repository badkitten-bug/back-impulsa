const db = require("../database/models");

// MODELO RETIRO PENSION, CREA REGISTRO EN COTIZADOR

const createRetirement = async(req) => {
    try {
        const retirement = await db.models.retiro_pension.create({
            edad_retiro:req.body.retiro_pension.edad_retiro,
            plan_retiro:req.body.retiro_pension.plan_retiro,
            tipo_plan:req.body.retiro_pension.tipo_plan,
            plan_retiro_pareja:req.body.retiro_pension.plan_retiro_pareja,
            tipo_plan_pareja:req.body.retiro_pension.tipo_plan_pareja,
            pago_seguro_social:req.body.retiro_pension.pago_seguro_social,
            pago_seguro_social_pareja:req.body.retiro_pension.pago_seguro_social_pareja,
            pension:req.body.retiro_pension.pension,
            ingresos_retirado:req.body.retiro_pension.ingresos_retirado
        });
        return retirement;
    } catch (error) {
        console.log("Error de create retiro pensión");
        console.log(error);
    };
};

module.exports = createRetirement;