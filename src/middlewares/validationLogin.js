const {body} = require("express-validator");

const validationLogin = [
  body("email").notEmpty().withMessage("Email: campo obligatorio"),
  body("contrasenia")
    .notEmpty()
    .withMessage("Contraseña: campo obligatorio")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener un mínimo de 8 caracteres")
    .bail(),
];

module.exports = validationLogin; 