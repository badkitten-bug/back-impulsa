const {body} = require("express-validator");
const db = require("../database/models");

const validationEditUser = [
    /*body("nombreApellido").notEmpty().withMessage("Campo obligatorio").bail(),
    body("email").notEmpty().withMessage.bail()("Campo obligatorio").bail()
        .isEmail().withMessage("Ingrese un formato de mail válido").bail()
        .isLength({max:30}).withMessage("La cantidad máxima de caracteres permitida es 30").bail()
        .custom(async(value)=>{
            const usuarioEncontrado = await db.usuario.findOne({where:{email:value}})
            if(usuarioEncontrado){
                throw new Error("Ya existe un usuario con ese email");
            };
        }),*/
    //revisar validacion max
    body("celular").isLength({max:20}).withMessage("La cantidad máxima de caracteres permitida es 20"),
    body("localidad").isLength({max:20}).withMessage("La cantidad máxima de caracteres permitida es 20"),
    body("pais").isLength({max:20}).withMessage("La cantidad máxima de caracteres permitida es 20")
];

module.exports = validationEditUser;