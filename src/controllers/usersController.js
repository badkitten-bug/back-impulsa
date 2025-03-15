const db = require("../database/models");
const { sequelize, Sequelize } = require("../database/models");
const op = Sequelize.Op;
const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;
//const bcrypt = require("bcryptjs");
const uploadImageUser = require("../middlewares/uploadImageUser");
const nodemailer = require("nodemailer");

const usersController = {
  profile: (req, res) => {
    db.models.usuario
      .findOne({
        where: { id: req.params.userId },
        include: { association: "usuario_tipo_usuario" },
      })
      .then((user) => {
        if (user !== null) {
          res.status(200).json({
            msg: "el usuario fue encontrado exitosamente",
            data: user,
          });
        } else {
          res.status(404).json({
            msg: "El usuario no existe",
          });
        }
      });
  },

  allUser: (req, res) => {
    db.models.usuario
      .findAll({
        order: [["id", "ASC"]],
      })
      .then((users) => {
        if (users !== null) {
          res.status(200).json({
            msg: "usuarios encontrados exitosamente",
            data: users,
          });
        } else {
          res.status(404).json({
            msg: "No hay usuarios registrados",
          });
        }
      });
  },

  allUserEdit: (req, res) => {
    db.models.usuario
      .findOne({ where: { id: req.params.userId } })
      .then((user) => {
        if (user !== null) {
          db.models.usuario
            .update(
              {
                status: req.body.status,
              },
              { where: { id: req.params.userId } }
            )
            .then(async (userEdited) => {
              let userHtml;
              let titulo;
              if (req.body.status == 1) {
                userHtml = `
                        <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Cuenta Activada</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: 50px auto;
            max-width: 600px;
        }
        .header {
            background-color: #035382;
            color: #ffffff;
            padding: 10px 0;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Cuenta Activada</h1>
        </div>
        <div class="content">
            <p>Hola</p>
            <p>Nos complace informarte que tu cuenta ha sido <strong>activada</strong>.</p>
            <p>Ya puedes acceder a todos los servicios disponibles en nuestra plataforma.</p>
            <p>Gracias por tu paciencia,</p>
            <p>El equipo de Soporte</p>
        </div>
        <div class="footer">
            <p>© 2024 Impulsa. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
                      `;
                titulo = "Cuenta Activada";
              }
              if (req.body.status == 2) {
                userHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Cuenta Baneada</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: 50px auto;
            max-width: 600px;
        }
        .header {
            background-color: #d9534f;
            color: #ffffff;
            padding: 10px 0;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Cuenta Baneada</h1>
        </div>
        <div class="content">
            <p>Hola</p>
            <p>Lamentamos informarte que tu cuenta ha sido <strong>baneada</strong> debido a una violación de nuestros términos de servicio.</p>
            <p>Si crees que esto es un error, por favor contacta a nuestro equipo de soporte para más información.</p>
            <p>Gracias,</p>
            <p>El equipo de Soporte</p>
        </div>
        <div class="footer">
            <p>© 2024 Impulsa. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
`;
                titulo = "Cuenta Baneada";
              }

              const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                  user: `${process.env.MAILER_MAIL}`,
                  pass: `${process.env.MAILER_PASS}`,
                },
              });
              if(req.body.status !== 0){
              const mailOptions = {
                from: `${process.env.MAILER_MAIL}`,
                to: req.body.email,
                subject: titulo,
                html: userHtml,
              };

              // Enviar el correo
              await transporter.sendMail(mailOptions);
            }
              res.status(200).json({
                msg: "usuario editado con éxito",
                data: userEdited,
              });
            });
        } else {
          res.status(404).json({
            msg: "El usuario no existe",
          });
        }
      });
  },

  edit: (req, res) => {
    db.models.usuario
      .findOne({ where: { id: req.params.userId } })
      .then((user) => {
        if (user !== null) {
          res.status(200).json({
            msg: "el usuario a editar fue encontrado exitosamente",
            data: user,
          });
        } else {
          res.status(404).json({
            msg: "El usuario no existe",
          });
        }
      });
  },
  saveEdit: async (req, res) => {
    try {
      const imageUser = await uploadImageUser(req, res);
      let validationErrors = validationResult(req);
      if (validationErrors.isEmpty()) {
        if (req.file == undefined) {
          db.models.usuario
            .update(
              {
                celular: req.body.celular,
                localidad: req.body.localidad,
                pais: req.body.pais,
              },
              { where: { id: req.params.userId } }
            )
            .then((userEdited) => {
              res.status(200).json({
                data: req.body,
                msg: "usuario editado con éxito, la foto de perfil no se modificó",
              });
            });
        } else {
          const user = await db.models.usuario.findOne({
            where: { id: req.params.userId },
          });
          if (user.dataValues.foto !== null) {
            const urlImage = user.dataValues.foto;
            const publicId = urlImage.slice(62, -4);
            cloudinary.uploader.destroy(publicId, (error, result) => {
              if (error) {
                console.log(error);
              } else {
                console.log(result);
              }
            });
          }
          await db.models.usuario
            .update(
              {
                celular: req.body.celular,
                foto: imageUser.secure_url,
                localidad: req.body.localidad,
                pais: req.body.pais,
              },
              { where: { id: req.params.userId } }
            )
            .then((userEdited) => {
              res.status(200).json({
                data: req.body,
                msg: "usuario editado, se cambió la foto de perfil",
              });
            });
        }
      } else {
        db.models.usuario
          .findOne({
            where: { id: req.params.userId },
          })
          .then((userEdited) => {
            res.status(400).json({
              msg: "no cumple con las validaciones",
              errores: validationErrors,
              data: userEdited,
            });
          });
      }
    } catch (error) {
      console.error("Error al editar usuario:", error);
      res.status(500).json({
        msg: "Internal server error",
        error: error.message,
      });
    }
  },
};

module.exports = usersController;
