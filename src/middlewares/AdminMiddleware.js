const db = require("../database/models");
const jwt = require("jsonwebtoken");

const adminAuthorizated = (req,res,next) =>{
    const token = req.headers["authorization"];
    const decoded = jwt.decode(token);
    
    if(decoded){
        db.models.usuario.findOne({where:{id:decoded.userExists}})
            .then((admin)=>{
                if(admin.id_tipo_usuario == 0){
                    next();
                }   
                    else{
                        res.status(401).json({
                            msg:"No tiene permisos para acceder, solo los usuarios administradores pueden obtener esa información"
                        });
                    };  
            });
    }
        else{
            res.status(401).json({
                msg:"No tiene permisos para acceder, debe loguearse y ser administrador"
            });
        };
}

module.exports = adminAuthorizated;