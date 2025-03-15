const { body } = require("express-validator");
const db = require("../database/models");

const validationCreateUser = [
  body("nombre_apellido").notEmpty().withMessage("Nombre: campo obligatorio"),
  body("email")
    .notEmpty()
    .withMessage("Email: campo obligatorio")
    .bail()
    .isEmail()
    .withMessage("Ingrese un formato de mail válido")
    .bail()
    .isLength({ max: 30 })
    .withMessage("La cantidad máxima de caracteres permitida es 30")
    .bail()
    .custom(async (value, { req }) => {
      const usuarioEncontrado = await db.models.usuario.findOne({
        where: { email: value },
      });
      if (usuarioEncontrado) {
        throw new Error("Ya existe un usuario con ese email");
      }
    }),
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
  body("repetirContra")
    .notEmpty()
    .withMessage("Repetir contraseña: campo obligatorio")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.contrasenia) {
        throw new Error("La contraseña no coincide con la ingresada");
      }
      return true;
    }),
];

module.exports = validationCreateUser;
