const db = require("../database/models");
const sequelize = require("../database/models/index");
const {validationResult} = require("express-validator");

const createCouple = require("../repository/coupleRepository");
const createDisability = require("../repository/disabilityRepository");
const createEducation = require("../repository/educationRepository");
const createLifeInsuranceCouple = require("../repository/lifeInsuranceCoupleRepository");
const createLifeInsurance = require("../repository/lifeInsuranceRepository");
const createMedicalExpense = require("../repository/medicalExpenseRepository");
const createRetiremen = require("../repository/retirementRepository");
const createSaving = require("../repository/savingRepository");
const createRecommendPerson = require("../repository/recommendPerson");
const createChildren = require("../repository/childrenRepository");

let customer;
let children;
let customerObjectives;
let recommend;
 
const createQuoter = async (req,res) => {
  try{
      await sequelize.transaction(async(t) => {
          const couple = await createCouple(req,{transaction:t});            
          const disability = await createDisability(req,{transaction:t});
          const education = await createEducation(req,{transaction:t});
          const lifeInsuranceCouple = await createLifeInsuranceCouple(req,{transaction:t});
          const lifeInsurance = await createLifeInsurance(req,{transaction:t});
          const medicalExpense = await createMedicalExpense(req,{transaction:t});
          const retiremen = await createRetiremen(req,{transaction:t});
          const saving = await createSaving(req,{transaction:t});
          const recommendPerson = await createRecommendPerson(req,{transaction:t});

          let validationErrors = validationResult(req);
          
          if(validationErrors.isEmpty()){
            customer = await db.models.cliente.create(
              {
                nombreApellido: req.body.nombreApellidoCliente,
                ocupacion: req.body.ocupacionCliente,
                fecha_nacimiento: req.body.fecha_nacimiento_cliente,
                pareja: req.body.pareja,
                id_estado_alta: 1,
                id_estado_civil: req.body.id_estado_civil,
                id_usuario: req.body.id_usuario,
                id_pareja: couple.id,
                id_ahorro: saving.id,
                id_educacion: education.id,
                id_gasto_medico: medicalExpense.id,
                id_invalidez: disability.id,
                id_retiro_pension: retiremen.id,
                id_seguro_vida_pareja: lifeInsuranceCouple.id,
                id_seguro_vida: lifeInsurance.id,
                inversion_metas: req.body.inversion_metas,
              },
              { transaction: t }
            );

            //a futuro revisar como guardar más de 1 recomendacion
            recommend = await db.models.cliente_persona_recomienda.create(
              {
                id_cliente: customer.id,
                id_persona_recomienda: recommendPerson.id,
              },
              { transaction: t }
            );
            
            if(req.body.datos_hijos !== undefined){
              children = await createChildren(req,{transaction:t});
              children.forEach(async (child) => {
                await child.update({ id_cliente: customer.id }, { transaction: t });
              });
            };

            // Guardar metas de cliente
            if(req.body.metas_y_objetivos !== undefined && customer.id){
              //customerObjectives = await createObjetive(req,customer.id,{transaction:t});
              const customerObjectivePromises = req.body.metas_y_objetivos.map(
                async (meta) => {
                  return await db.models.cliente_meta_objetivo.create(
                    {
                      id_meta_objetivo: meta.id_meta_objetivo,
                      id_cliente: customer.id,
                      prioridad: meta.prioridad,
                    },
                    { transaction: t }
                  );
                }
              );
              customerObjectives = await Promise.all(customerObjectivePromises);
            }; 
              res.status(201).json({
                msg: "Registro creado",
                data: { customer, children, customerObjectives, recommend },
              });
            
          } else{
              return res.status(400).json({
                  msg:"No se pudo guardar el registro porque no cumple las validaciones",
                  data:validationErrors
              });
          }; 
      });
         
  }
  catch(error){
      console.error("Transaction rolled back due to error:", error);
      res.json({
        msg:"Ocurrión un error al enviar formulario"
      })
  };
};


module.exports = {createQuoter};