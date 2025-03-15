const db = require("../database/models");

const createMedicalExpense = async(req) => {
  try {
    const medicalExpense = await db.models.gasto_medico.create({
      seguro_gastos: req.body.gasto_medico.seguro_gastos,
      tipo_seguro: req.body.gasto_medico.tipo_seguro_medico,
      adecuado: req.body.adecuado,
      company: req.body.gasto_medico.company_medico,
      enfermedad: req.body.gasto_medico.enfermedad,
    }); 
    return medicalExpense;
  } catch (error) {
      console.log("Error de create gastos médicos");
      console.log(error);
  };
};

module.exports = createMedicalExpense;