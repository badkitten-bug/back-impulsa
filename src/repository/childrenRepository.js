const db = require("../database/models");

const createChildren = async(req) => {
  try {
    const allChildrens = req.body.datos_hijos.map(
      async (hijo) => {
          return await db.models.hijo.create({
          nombreApellido: hijo.nombreApellidoHijo,
          fecha_nacimiento: hijo.fecha_nacimiento_hijo
        });
      }
    );
        
    const childrens = await Promise.all(allChildrens);    
    return childrens;

  } catch (error) { 
      console.log("Error de create children");
      console.log(error);
  };
};

module.exports = createChildren;