const db = require("../database/models");

const createObjetive = async(req,idCustomer) => {
  try {
    
    const allObjetives = req.body.metas_y_objetivos.map(
      async(meta) => {
        return await db.models.cliente_meta_objetivo.create({
        id_meta_objetivo: meta.id_meta_objetivo,
        prioridad: meta.prioridad,
        id_cliente: idCustomer
        });
      }
    );

    const objectives = await Promise.all(allObjetives);
    return objectives;

    } catch (error) {
      console.log("Error de create objetive");
      console.log(error);
    };
};

module.exports = createObjetive;