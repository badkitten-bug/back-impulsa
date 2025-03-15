const models = require("../models/index.js");
const tiposUsuario = models.models.tipo_usuario;

const createUserType = async()=>{
    const usersTypes = [
        {id:0, tipo:"Admin"},
        {id:1, tipo:"Agente"}
    ];

    for(const type of usersTypes){
       await tiposUsuario.findOrCreate({where:{id:type.id},defaults:type});
    };
};

module.exports = createUserType;