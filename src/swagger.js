const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerOptions = {
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title:"Aseguradora impulsa api documentation",
            version:"1.0.0"
        }
    },
    apis:[`${path.join(__dirname,"./routers/*")}`]
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

module.exports = swaggerSpec;