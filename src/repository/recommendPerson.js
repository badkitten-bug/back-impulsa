const db = require("../database/models");

const createRecommendPerson = async(req) => {
    try {
        const recommendPerson = await db.models.persona_recomienda.create({
            nombreApellido:req.body.nombreApellidoRecomendante,
            celular:req.body.celular,
            email:req.body.email,
        });
        return recommendPerson; 
    } catch (error) {
        console.log("Error de create persona recomienda");
        console.log(error);
    };
};

module.exports = createRecommendPerson;