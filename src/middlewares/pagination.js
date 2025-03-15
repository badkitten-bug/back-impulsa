const db = require("../database/models");

const paginationAdmin = async (req,res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
    try {
      const { count, rows } = await db.models.cliente.findAndCountAll({
        include:{association:'cliente_estado_alta'},
        limit:pageSize,
        offset:(page - 1) * pageSize
      });  
        return {
          info:{
            totalCustomers: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page
          },
          customers: rows
        };
    } catch (error) {
        return error;
      };    
};

const paginationUser = async (req,res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
    try {
      const { count, rows } = await db.models.cliente.findAndCountAll({
        where:{id_usuario:req.params.userId},
        include:{association:'cliente_estado_alta'},
        limit:pageSize,
        offset:(page - 1) * pageSize
      });  
        return {
          info:{
            totalCustomers: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page
          },
          customers: rows
        };
    } catch (error) {
        return error;
      };  
}
module.exports = {paginationAdmin,paginationUser};