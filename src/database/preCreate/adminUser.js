const models = require("../models/index.js");
const usuarioAdmin = models.models.usuario;
const bcrypt = require("bcryptjs");

const contraEncriptada = bcrypt.hashSync("Admin123456",10);
const createAdminUser = async()=>{
    const adminUser = {
        nombre_apellido:"usuario admin",
        email:"usuarioadmin@gmail.com",
        contrasenia:contraEncriptada,
        id_tipo_usuario:0
    };

    await usuarioAdmin.findOrCreate({where:{email:adminUser.email},defaults:adminUser});
};

module.exports = createAdminUser;