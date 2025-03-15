const express = require("express");
const statisticsRouter = express.Router();

// middlewares
const authorizado =  require("../middlewares/authMiddleware");
const adminAuthorizated = require("../middlewares/AdminMiddleware");
const accesUserCustomer = require("../middlewares/accesUserProfile");
//controller
const statisticsController = require("../controllers/statisticsController");

// *** PARA AGENTE ***
//ver todos sus clientes, solo los suyos
statisticsRouter.get("/customers/:userId",authorizado,accesUserCustomer,statisticsController.agentAllCustomers);
//ver cliente específico
statisticsRouter.get("/customer/:userId/:customerId",authorizado,accesUserCustomer,statisticsController.agentOneCustomer);

// *** PARA ADMIN ***
//ver todos los clientes
statisticsRouter.get("/admin/customers",authorizado,adminAuthorizated,statisticsController.adminAllCustomers);
//ver cliente específico
statisticsRouter.get("/admin/customer/:customerId",authorizado,adminAuthorizated,statisticsController.adminOneCustomer);


module.exports = statisticsRouter;