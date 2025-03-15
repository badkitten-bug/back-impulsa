const models = require("../models/index.js");
const estadoCivil = models.models.estado_civil;

const createCivilStatus = async()=>{
    const civilStatus = [
        {id:0, estado:"Soltero/a"},
        {id:1, estado:"Casado/a"},
        {id:2, estado:"Divorciado/a"},
        {id:3, estado:"Viudo/a"}
    ];

    for(const status of civilStatus){
       await estadoCivil.findOrCreate({where:{id:status.id},defaults:status});
    };
};

module.exports = createCivilStatus;