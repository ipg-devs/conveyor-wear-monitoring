import express from "express";
import cors from "cors";
import DIContainer from "../app/main";
import apiRoutes from "./routes";
import requestLogger from './middleware/request-logger';
import rootRoute from './routes/rootRoute';
import process from 'process'

const environment = process.env.ENV || 'development'

const rootHandler = rootRoute[environment];

const container = DIContainer();


module.exports = (port = 5000) => {
  const app = express();

  app.use(cors({
    origin: /\.pink-shrimp-90\.telebit\.io$/
  }));
  app.use((req, _res, next) => {
    req.scope = container.createScope();
    return next();
  });
  app.use(express.json());
  app.use(requestLogger);

  app.get("/", rootHandler);
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
