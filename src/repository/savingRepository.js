const db = require("../database/models");

const createSaving = async(req) => {
    try {
        const saving = await db.models.ahorro.create({
            ahorro_sistematico:req.body.ahorro.ahorro_sistematico,
            cantidad_mensual:req.body.ahorro.cantidad_mensual,
            instrumento_financiero:req.body.ahorro.instrumento_financiero
        });
        return saving;
    } catch (error) {
        console.log("Error de create ahorro");
        console.log(error);
    };
};

module.exports = createSaving;