import { Router } from "express";
import trike from "trike";
import verifyToken from '../middleware/verifyToken'

const siteRouter = new Router();

siteRouter
  .get("/", verifyToken, async (req, res, next) => {
    const getAllSites = req.scope.resolve("getAllSites");
    const [err, result] = await trike(() => getAllSites());

    if (err) return next(err);
    return res.json(result);
  })
  .post("/create", async (req, res, next) => {
    const [e, createSite] = trike(() =>
      req.scope.resolve("createSite")
    );

    if (e) return next(e);
    const { name } = req.body.Site;
    const [err, result] = await trike(() => createSite({ name }));

    if (err) return next(err);
    return res.json(result);
  })
  .post("/update", async (req, res, next) => {
    const updateSite = req.scope.resolve("updateSite");
    const [err, result] = await trike(() => updateSite(req.body.Site));

    if (err) return next(err);
    return res.json(result);
  })
  .post("/:id", async (req, res, next) => {
    const destroySite = req.scope.resolve("destroySite");
    const [err, result] = await trike(() => destroySite(req.param.id));

    if (err) return next(err);
    return res.json(result);
  });

export default siteRouter;
