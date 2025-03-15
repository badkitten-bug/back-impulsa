const express = require("express");
const usersRouter = express.Router();
  
//controller
const usersController = require("../controllers/usersController");

//middlewares
const authorizado =  require("../middlewares/authMiddleware");
const validationEditUser = require("../middlewares/validationEditUser");
const accesUserProfile = require("../middlewares/accesUserProfile");

//endpoints

//obtener datos de usuario y mostrar en el perfil
usersRouter.get("/profile/:userId",authorizado,accesUserProfile,usersController.profile);


//optener todos los usuarios
usersRouter.get("/all-user", usersController.allUser);

usersRouter.put("/update-status/:userId", usersController.allUserEdit);

//obtener datos y guardar modificaciones de perfil
usersRouter.get("/edit/:userId",authorizado,accesUserProfile,usersController.edit);

//el middleware de validacion detiene el proceso, gira en falso
usersRouter.put("/edit/:userId",authorizado,accesUserProfile/*,validationEditUser,*/,usersController.saveEdit);

module.exports = usersRouter;