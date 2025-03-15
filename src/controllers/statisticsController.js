const db = require("../database/models");
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const {paginationUser,paginationAdmin} = require("../middlewares/pagination");

const adminAllCustomers = async (req,res) =>{
    try{
        const adminPagination = await paginationAdmin(req,res); 
        const customers = adminPagination.customers;  
        const customersList = customers.map(({nombreApellido,cliente_estado_alta,ocupacion,createdAt}) => ({nombreApellido,cliente_estado_alta,ocupacion,createdAt}));
        res.status(200).json({
            msg: "Datos de todos los clientes obtenidos correctamente",
            valoresPaginacion:adminPagination.info,
            data:customersList
        });
    }
    catch(error){
        console.error("Error al obtener datos clientes:", error);
        res.status(400).json({
            msg:"No se pudieron obtener los datos"
        });
    };
};

const adminOneCustomer = async (req,res)=>{
    //falta traer los datos de la persona que recomendó, se trae solo el id
    try{
        const oneCustomer = await db.models.cliente.findOne({
            where:{id:req.params.customerId},
            include:[
                {association:"cliente_estado_alta"},{association:"cliente_estado_civil"},
                {association:"cliente_usuario"},{association:"cliente_pareja"},
                {association:"persona_recomendada"},{association:"cliente_ahorro"},
                {association:"cliente_educacion"},{association:"cliente_gasto_medico"},
                {association:"cliente_invalidez"},{association:"cliente_retiro_pension"},
                {association:"cliente_seguro_vida_pareja"},{association:"cliente_seguro_vida"},
                {association:"las_metas"},{association:"cliente_hijo"}
            ]}
        );
        const {id,nombreApellido,ocupacion,fecha_nacimiento,pareja,inversion_metas,createdAt,updatedAt,
              cliente_estado_alta,cliente_estado_civil,cliente_usuario,cliente_pareja,persona_recomendada,
              cliente_ahorro,cliente_educacion,cliente_gasto_medico,cliente_invalidez,cliente_retiro_pension,
              cliente_seguro_vida_pareja,cliente_seguro_vida,las_metas,cliente_hijo} = oneCustomer;
        if(oneCustomer){
            res.status(200).json({
                msg:"datos del cliente obtenidos correctamente",
                data:{id,nombreApellido,ocupacion,fecha_nacimiento,pareja,inversion_metas,createdAt,updatedAt,
                    cliente_estado_alta,cliente_estado_civil,cliente_usuario,cliente_pareja,persona_recomendada,
                    cliente_ahorro,cliente_educacion,cliente_gasto_medico,cliente_invalidez,cliente_retiro_pension,
                    cliente_seguro_vida_pareja,cliente_seguro_vida,las_metas,cliente_hijo}
            }); 
        }  
            else{
                res.status(404).json({
                    msg:"No se encontró ningún cliente con ese id"
                }); 
            };     
    }
    catch(error){
        console.error("Error al obtener datos del cliente:", error);
        res.status(400).json({
            msg:"No se pudieron obtener los datos"
        });
    };   
};

const agentAllCustomers = async (req,res)=>{
    try{
        const infoPagination = await paginationUser(req,res);
        const customers = infoPagination.customers;
        const customersList = customers.map(({nombreApellido,cliente_estado_alta,ocupacion,createdAt}) => ({nombreApellido,cliente_estado_alta,ocupacion,createdAt}));
        if(customers.length !== 0){
            res.status(200).json({
                msg: "Datos obtenidos correctamente",
                valoresPaginacion:infoPagination.info,
                dataClientes:customersList
            });
        }
            else{
                res.status(404).json({
                    msg:"este agente aún no tiene clientes",
                });
            };
    }
    catch(error){
        console.error("Error al obtener datos clientes:", error);
        res.status(400).json({
            msg:"No se pudieron obtener los datos"
        });
    };
};

const agentOneCustomer = async (req,res)=>{
    try{
        const oneCustomer = await db.models.cliente.findOne({
            where:{
                [op.and]:[
                    {id:req.params.customerId},
                    {id_usuario:req.params.userId}
                ]
            },
            include:[
                {association:"cliente_estado_alta"},{association:"cliente_estado_civil"},
                {association:"cliente_usuario"},{association:"cliente_pareja"},
                {association:"persona_recomendada"},{association:"cliente_ahorro"},
                {association:"cliente_educacion"},{association:"cliente_gasto_medico"},
                {association:"cliente_invalidez"},{association:"cliente_retiro_pension"},
                {association:"cliente_seguro_vida_pareja"},{association:"cliente_seguro_vida"},
                {association:"las_metas"},{association:"cliente_hijo"}
            ]
        });

        const {id,nombreApellido,ocupacion,fecha_nacimiento,pareja,inversion_metas,createdAt,updatedAt,
            cliente_estado_alta,cliente_estado_civil,cliente_usuario,cliente_pareja,persona_recomendada,
            cliente_ahorro,cliente_educacion,cliente_gasto_medico,cliente_invalidez,cliente_retiro_pension,
            cliente_seguro_vida_pareja,cliente_seguro_vida,las_metas,cliente_hijo} = oneCustomer;

        if(oneCustomer){
            res.status(200).json({
                msg:"datos del cliente obtenidos correctamente",
                data:{id,nombreApellido,ocupacion,fecha_nacimiento,pareja,inversion_metas,createdAt,updatedAt,
                    cliente_estado_alta,cliente_estado_civil,cliente_usuario,cliente_pareja,persona_recomendada,
                    cliente_ahorro,cliente_educacion,cliente_gasto_medico,cliente_invalidez,cliente_retiro_pension,
                    cliente_seguro_vida_pareja,cliente_seguro_vida,las_metas,cliente_hijo}
            }); 
        }  
            else{
                res.status(404).json({
                    msg:"No se encontró ningún cliente con ese id"
                }); 
            };     
    }
    catch(error){
        console.error("Error al obtener datos del cliente:", error);
        res.status(400).json({
            msg:"No se pudieron obtener los datos"
        });
    };   
};

module.exports = {adminAllCustomers,adminOneCustomer,agentAllCustomers,agentOneCustomer};