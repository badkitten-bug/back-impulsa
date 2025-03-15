const express = require("express");
const quoterRouter = express.Router();

//controller
const quoterController = require("../controllers/quoterController");

//middlewares
const authorizado =  require("../middlewares/authMiddleware");
const validationCreateQuoter = require("../middlewares/validationCreateQuoter");

//creación registro cotizador
quoterRouter.post("/create",authorizado,validationCreateQuoter,quoterController.createQuoter);

module.exports = quoterRouter;