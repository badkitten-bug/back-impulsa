const models = require("../models/index.js");
const metaObjetivos = models.models.meta_objetivo;

const createObjective = async()=>{
    const objectives = [
        {id:0, tema:"Educación de los hijos"},
        {id:1, tema:"Ahorro personal, hijos adolescentes o ahorro para cónyuge"},
        {id:2, tema:"Retiro y pensión"},
        {id:3, tema:"Protección con seguro de vida"},
        {id:4, tema:"Protección con gastos médicos mayores"},
        {id:5, tema:"Empresarial y/o fiscal (ahorro o pensión)"},
        {id:6, tema:"Inversiones"}
    ];

    for(const objective of objectives){
       await metaObjetivos.findOrCreate({where:{id:objective.id},defaults:objective});
    };
};

module.exports = createObjective;