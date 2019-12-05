import express from "express";
import Cors from "cors";
import bodyParser from "body-parser";
import logger from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import passport from "passport";
import helmet from "helmet";

const app = express();

const API_PORT = process.env.API_PORT || 3000;
const swaggerDefinition = {
  info: {
    title: "TSC Account Service Swagger API",
    version: "1.0.0",
    description: "Endpoints to user authtication"
  },
  host: "ocp-4-nodejs-git-demoproject.apps.us-west-1.starter.openshift-online.com",
  basePath: "/",
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header"
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

require('./config/passport');

// const whitelist = [
//   'http://localhost:3000'
// ];
// const corsOptions = {
//   origin: (origin, callback) => {
//     console.log(origin)
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   optionsSuccessStatus: 200,
// };

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(helmet());
app.use(passport.initialize());

require('./routes/loginUser')(app);
require('./routes/registerUser')(app);
require('./routes/forgotPassword')(app);
require('./routes/resetPassword')(app);
require('./routes/updatePassword')(app);
require('./routes/updatePasswordViaEmail')(app);
require('./routes/findUsers')(app);
require('./routes/deleteUser')(app);
require('./routes/updateUser')(app);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

module.exports = app;