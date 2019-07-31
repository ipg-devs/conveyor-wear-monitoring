import { Router } from "express";
import bwmsRoutes from "./bwms";
import userRoutes from "./user";
import siteRoutes from "./site";

const apiRouter = new Router();

apiRouter
  .use("/bwms", bwmsRoutes)
  .use("/user", userRoutes)
  .use("/site", siteRoutes);

export default apiRouter;
