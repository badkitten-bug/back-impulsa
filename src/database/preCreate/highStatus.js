const models = require("../models/index.js");
const estadoAlta = models.models.estado_alta;

const createHighStatus= async()=>{
    const highStatus = [
        {id:0, estado:"Aprobado"},
        {id:1, estado:"En proceso"},
        {id:2, estado:"Rechazado"}
    ];

    for(const status of highStatus){
       await estadoAlta.findOrCreate({where:{id:status.id},defaults:status});
    };
};

module.exports = createHighStatus;