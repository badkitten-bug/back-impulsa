const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const cookie = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./src/swagger.js")
//REVISAR EN LOS OTROS ACHIVOS QUE LOS REQUIERE
require("dotenv").config();

const port = process.env.PORT || 3000;

const db = require("./src/database/models/index.js");
const createUserType = require("./src/database/preCreate/typeUser.js");
const createCivilStatus = require("./src/database/preCreate/civilStatus.js");
const createHighStatus = require("./src/database/preCreate/highStatus.js");
const createObjective = require("./src/database/preCreate/objective.js");
const createAdminUser = require("./src/database/preCreate/adminUser.js")
const app = express();

//Rutas
const authRouter = require("./src/routers/authRouter");
const usersRouter = require("./src/routers/usersRouter");
const quoterRouter = require("./src/routers/quoterRouter");
const statisticsRouter = require("./src/routers/statisticsRouter.js");
const chasisRouter = require("./src/routers/chasisRouter.js");

//datos para cors
const { CORS_DOMAIN, BACK_DOMAIN } = process.env;
const whiteList = [CORS_DOMAIN, BACK_DOMAIN, 'http://localhost:3008', 'http://localhost:5173'];
const corsOptions = {
    origin: whiteList,
    exposedHeaders: "authorization",
};




app.use(cors(corsOptions));
app.use(morgan("dev")); //opcion combined
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(cookie());
app.use(
  session({
    secret: "propiedadSecreta",
    resave: false,
    saveUninitialized: false,
  })
);

db.sync({alter:false})
    .then(()=>{
        createUserType();
        createCivilStatus();
        createHighStatus();
        createObjective();
        createAdminUser();

        app.listen(port,()=>{
            console.log("servidor corriendo en el puerto: ", port);
        });
    })
    .catch((error)=>{
        console.error("error connecting database:", error);
    });



app.use("/statistics",statisticsRouter);
app.use("/quoter", quoterRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/chasis",chasisRouter);