import express from "express";
import cors from "cors";
import DIContainer from "./app/main";
import apiRoutes from "./client-rest/routes";
import requestLogger from './client-rest/middleware/request-logger';
import process from 'process'
import path from "path";

const environment = process.env.NODE_ENV || 'development'

const container = DIContainer();

function rootHandler(app){
  if (environment === "production"){
    console.log("************** using production route **************")
    app.use(express.static(path.join(__dirname,'public')))
  } else {
    app.get("/", (req, res) => {
      res.send("hello");
    });
  }
}


module.exports = (port = 5000) => {
  const app = express();

  app.use(cors({
    origin: [/ipg-app\.herokuapp\.com/, /\.pink-shrimp-90\.telebit\.io$/]
  }));
  app.use((req, _res, next) => {
    req.scope = container.createScope();
    return next();
  });
  app.use(express.json());
  app.use(requestLogger);

  rootHandler(app);
  app.use("/api", apiRoutes);

  // Error handling middleware
  app.use((err, _req, res, _next) => {
    const { status = 500, message = "Unknown Error Occured" } = err;

    return res.status(status).json({ error: message });
  });

  const server = app.listen(port, () =>
    console.log(`Server running on port ${port}`)
  );

  return server;
};
