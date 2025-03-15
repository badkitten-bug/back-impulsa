const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const validationCrearUsuario = require("../middlewares/validationCreateUser");
const validationLogin = require("../middlewares/validationLogin");
const validationPasswordUpdate = require("../middlewares/validationPasswordUpdate");

authRouter.post("/register",validationCrearUsuario,authController.createUser);
authRouter.post("/login",validationLogin,authController.login);

authRouter.post("/forget-pass",  authController.validateEmail);

authRouter.post('/update-password', validationPasswordUpdate, authController.updatePassword);


authRouter.post("/recovery",validationLogin,authController.login);


//GOOGLE AUTH
authRouter.post("/google", authController.google);
authRouter.get("/google/callback", authController.googleCallback);

module.exports = authRouter;