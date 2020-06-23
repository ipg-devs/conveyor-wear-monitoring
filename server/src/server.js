import express from "express";
import cors from "cors";
import DIContainer from "./app/main";
import apiRoutes from "./client-rest/routes";
import requestLogger from './client-rest/middleware/request-logger';
import verifyToken from './client-rest/middleware/verifyToken';
import process from 'process'
import path from "path";

const environment = process.env.NODE_ENV || 'development'
const container = DIContainer();

module.exports = (port = 5000) => {
  const app = express();

/* In production we serve front-end static files */
  if (environment === "production") {
    console.log("************** using production route **************");
    app.use(express.static(path.join(__dirname, "public")));
  }

/*********** Security  *****************/
/*       only uncomment ONE 
/*******  closed api - limit requests to specific routes */

  // app.use(cors({
  //   origin: environment === "production" ? [/ipg-app\.herokuapp\.com/, /\.pink-shrimp-90\.telebit\.io$/] : '*'
  // }));

/****************** open api */
  app.use(cors());

/***********  End Security  *****************/


  /********   Dependency Injection using awilix    ******************/
  app.use((req, _res, next) => {
    req.scope = container.createScope();
    return next();
  });

 /*********   Middleware    ******************/
  app.use(express.json());
  app.use(requestLogger);

   /*******   Routing    ******************/
  app.use("/api", verifyToken, apiRoutes);
  app.post("/login", async (req, res, next) => {
    const login = req.scope.resolve("login");
    const { username, password } = req.body;
    const result = await login({ username, password });

    if (!result) return next(err);
    const {token, user} = result;
    return res.json({ token, user });
  });

/***********  Error handling middleware  *****************/
  app.use((err, _req, res, _next) => {
    const { status = 500, message = "Unknown Error Occured" } = err;

    return res.status(status).json({ error: message });
  });

/***********  Server     *************************/
  const server = app.listen(port, () =>
    console.log(`Server running on port ${port}`)
  );

  return server;
};;
