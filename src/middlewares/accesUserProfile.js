const jwt = require("jsonwebtoken");
require("dotenv").config();

const decodedToken = (req,res,next)=>{
    const token = req.headers["authorization"];
    const decoded = jwt.decode(token);
    
    if(decoded.userExists == req.params.userId){
        next();
    }
    else{
        console.log("ejecutando...")
        res.status(401).json({
            msg:"No tiene permisos para acceder, el usuario logueado no coincide con el perfil al que intenta ingresar o la información específica que desea obtener"
        });
    };
};

module.exports = decodedToken;