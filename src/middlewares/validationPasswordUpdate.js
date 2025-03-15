const { body } = require("express-validator");
const db = require("../database/models");

const validationPasswordUpdate = [
  body("contrasenia")
    .notEmpty()
    .withMessage("Contraseña: campo obligatorio")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener un mínimo de 8 caracteres")
    .bail()
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe contener al menos una letra mayúscula")
    .bail()
    .matches(/\d/)
    .withMessage("La contraseña debe contener al menos un número"),
];

module.exports = validationPasswordUpdate;
