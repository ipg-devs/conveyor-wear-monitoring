import { Router } from "express";
import trike from "trike";
import verifyToken from '../middleware/verifyToken';

const bwmsRouter = new Router();

bwmsRouter
.get("/", verifyToken, async (req, res, next) => {
  const getBwmsBysite_id = req.scope.resolve("getBwmsBysite_id");
  const [err, result] = await trike(() => getBwmsBysite_id(req.body.site_ids));

  if (err) return next(err);
  return res.json(result);
})
.get("/all", verifyToken, async (req, res, next) => {
    const getAllBwms = req.scope.resolve("getAllBwms");
    const [err, result] = await trike(() => getAllBwms());

    if (err) return next(err);
    return res.json(result);
  })

export default bwmsRouter;
