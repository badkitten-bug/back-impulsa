const db = require("../database/models");
const { sequelize, Sequelize } = require("../database/models");
const op = Sequelize.Op;
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { where } = require("sequelize");
const nodemailer = require("nodemailer");
require("dotenv").config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

const JWT_SECRET_RECOVERY_PASSWORD = process.env.JWT_SECRET_RECOVERY_PASSWORD;
const JWT_SECRET_RECOVERY_PASSWORD_TIME =
  process.env.JWT_SECRET_RECOVERY_PASSWORD_TIME;
const REDIRECT_URL = `${process.env.BACK_DOMAIN}/auth/google/callback`;

const authController = {
  createUser: (req, res) => {
    let validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      const contraEncriptada = bcrypt.hashSync(req.body.contrasenia, 10);
      db.models.usuario
        .create({
          nombre_apellido: req.body.nombre_apellido,
          email: req.body.email,
          contrasenia: contraEncriptada,
          id_tipo_usuario: 1,
        })
        .then(async (userExists) => {
          const userToLogin = { userExists: userExists.id };
          const createToken = (userToLogin) => {
            return jwt.sign(userToLogin, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });
          };
          const token = createToken(userToLogin);
          const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: `${process.env.MAILER_MAIL}`,
              pass: `${process.env.MAILER_PASS}`,
            },
          });

          const emailTemplate = `
          <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Registro de Cuenta</title>
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
            <h1>Registro de Cuenta</h1>
        </div>
        <div class="content">
            <p>Hola,</p>
            <p>Gracias por registrarte en nuestro servicio. Tu cuenta está actualmente en espera de activación por un administrador.</p>
            <p>Recibirás una notificación una vez que tu cuenta haya sido activada.</p>
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

          const emailTemplateADmin = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Nueva Cuenta Creada</title>
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
            <h1>Nueva Cuenta Creada</h1>
        </div>
        <div class="content">
            <p>Hola,</p>
            <p>Se ha creado una nueva cuenta en el sistema y está pendiente de activación.</p>
            <p>Por favor, revisa y activa la cuenta lo antes posible.</p>
            <p>Gracias,</p>
            <p>El equipo de Soporte</p>
        </div>
        <div class="footer">
            <p>© 2024 Impulsa. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>`;

          // Configurar el correo
          const mailOptions = {
            from: `${process.env.MAILER_MAIL}`,
            to: req.body.email,
            subject: "Registro de Cuenta",
            html: emailTemplate,
          };

          // Enviar el correo
          await transporter.sendMail(mailOptions);


          const mailOptions2 = {
            from: `${process.env.MAILER_MAIL}`,
            to: `${process.env.ADMIN_EMAIL}`,
            subject: "Registro de nuevo usuario",
            html: emailTemplateADmin,
          };

          // Enviar el correo
          await transporter.sendMail(mailOptions2);
          res.status(201).header("authorization", token).json({
            uuid: userToLogin,
            msg: "registro creado exitosamente",
          });
        });
    } else {
      res.status(400).json({
        msg: "No se pudo guardar el registro porque no cumple las validaciones",
        data: validationErrors,
      });
    }
  },

  validateEmail: async (req, res) => {
    const { email } = req.body;

    // Validar que el correo no esté vacío y tenga un formato correcto

    try {
      // Verificar si el correo existe en la base de datos
      const user = await db.models.usuario.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ msg: "Correo no encontrado" });
      }

      // Crear un token con expiración de 1 hora
      const token = jwt.sign({ email }, JWT_SECRET_RECOVERY_PASSWORD, {
        expiresIn: JWT_SECRET_RECOVERY_PASSWORD_TIME,
      });

      // Crear la URL con el token
      const url = `${process.env.CORS_DOMAIN}/recovery-pass/${token}`;

      // Configurar el transporte de nodemailer
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: `${process.env.MAILER_MAIL}`,
          pass: `${process.env.MAILER_PASS}`,
        },
      });

      const emailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Recuperación de Cuenta</title>
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
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  margin: 20px 0;
                  background-color: #035382;
                  color: #ffffff !important;
                  text-decoration: none;
                  border-radius: 5px;
              }
              .footer {
                  text-align: center;
                  padding: 10px;
                  font-size: 12px;
                  color: #888888;
              }
                  a{
                  color: #FFF;
                  text-decoration: none;
                  }
                  .ii a[href]{
                  color: #FFF;}
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Recuperación de Cuenta</h1>
              </div>
              <div class="content">
                  <p>Hola,</p>
                  <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no realizaste esta solicitud, puedes ignorar este correo electrónico.</p>
                  <p>Para restablecer tu contraseña, haz click en el siguiente enlace:</p>
                  <a href="${url}" class="button">Restablecer Contraseña</a>
                  <p>Este enlace es válido por 1 hora.</p>
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

      // Configurar el correo
      const mailOptions = {
        from: `${process.env.MAILER_MAIL}`,
        to: email,
        subject: "Validación de correo",
        html: emailTemplate,
      };

      // Enviar el correo
      await transporter.sendMail(mailOptions);

      res.status(200).json({ msg: "Correo de validación enviado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al enviar el correo de validación" });
    }
  },

  updatePassword: async (req, res) => {
    const { token, password } = req.body;


    try {
      // Verificar el token
      const decoded = jwt.verify(token, JWT_SECRET_RECOVERY_PASSWORD);
      const { email } = decoded;

      // Verificar si el correo existe en la base de datos
      const user = await db.models.usuario.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ msg: "Correo no encontrado" });
      }

      // Hashear la nueva contraseña
      const hashedPassword = await bcrypt.hashSync(password, 10);

      // Actualizar la contraseña en la base de datos
      await db.models.usuario.update(
        { contrasenia: hashedPassword },
        { where: { email } }
      );

      res.status(200).json({ msg: "Contraseña actualizada exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al actualizar la contraseña" });
    }
  },

  login: (req, res) => {
    let validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
      db.models.usuario
        .findOne({ where: { email: req.body.email } })
        .then((userExists) => {
          let contraseniaOk;

          if (userExists) {
            if (!userExists.contrasenia) {
              return res.status(400).json({
                msg: "Debes Iniciar Sesión con Google.",
              });
            }
            if (userExists.status == 0) {
              return res.status(400).json({
                msg: "Cuenta pendiente de activación.",
              });
            }
            if (userExists.status == 2) {
              return res.status(400).json({
                msg: "Su cuenta ha sido bloqueada.",
              });
            }
            contraseniaOk = bcrypt.compareSync(
              req.body.contrasenia,
              userExists.contrasenia
            );
          }
          if (userExists && contraseniaOk) {
            const user = { userExists: userExists.id };

            const createToken = (user) => {
              return jwt.sign(user, process.env.JWT_SECRET, {
                expiresIn: "7d",
              });
            };
            const token = createToken(user);
            res.status(200).header("authorization", token).json({
              uuid: user,
              msg: "logueo exitoso",
            });
          } else {
            res.status(400).json({
              msg: "Las credenciales de acceso son inválidas",
            });
          }
        });
    } else {
      res.status(400).json({
        msg: "No se pudo ingresar porque hay campos incompletos",
        data: validationErrors,
      });
    }
  },

  google: async (req, res) => {
    const oAuth2Client = new OAuth2Client(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      REDIRECT_URL
    );

    const authorizeURL = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "openid",
      ],
      prompt: "consent",
    });

    res.json({ url: authorizeURL });
  },
  googleCallback: async (req, res) => {
    const oAuth2Client = new OAuth2Client(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      REDIRECT_URL
    );
    const code = req.query.code;

    if (!code) {
      return res.status(400).send("No code found");
    }

    try {
      const { tokens } = await oAuth2Client.getToken(code);
      await oAuth2Client.setCredentials(tokens);

      const ticket = await oAuth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience: GOOGLE_CLIENT_ID,
      });

      const payload = await ticket.getPayload();
      const userId = payload.sub;

      const userLoginExist = await db.models.usuario.findOne({
        where: {
          email: payload.email,
        },
      });

      if (userLoginExist) {
        const passwordOk = bcrypt.compareSync(userId, userLoginExist.googleId);
        if (userLoginExist && passwordOk) {
          const user = { userExists: userLoginExist.id };
          const token = jwt.sign(user, JWT_SECRET, {
            expiresIn: "7d",
          });

          return res.redirect(
            `${process.env.CORS_DOMAIN}/googleAuth/auth/callback?access_token=${token}&user_id=${userLoginExist.id}`
          );
        }
      }

      const idEncrypted = bcrypt.hashSync(userId, 10);

      const userRegisterExist = await db.models.usuario.create({
        nombre_apellido: payload.name,
        email: payload.email,
        googleId: idEncrypted,
        id_tipo_usuario: 1,
      });

      const user = { userExists: userRegisterExist.id };

      const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });

      res.redirect(
        `${process.env.CORS_DOMAIN}/googleAuth/auth/callback?access_token=${token}&user_id=${userRegisterExist.id}`
      );
    } catch (error) {
      console.error("Error durante la autentificación", error);
      res.status(500).send("Error durante la autentificación");
    }
  },
};

module.exports = authController;
