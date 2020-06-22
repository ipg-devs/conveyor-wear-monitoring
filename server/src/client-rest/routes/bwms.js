import { Router } from "express";
import trike from "trike";
import verifyToken from '../middleware/verifyToken';

const bwmsRouter = new Router();

bwmsRouter
  .post("/", verifyToken, async (req, res, next) => {
    const {ids} = req.body;
    console.log(ids, 'router ids...')
    const getBwmsBySiteId = req.scope.resolve("getBwmsBySiteId");
    const [err, result] = await trike(() => getBwmsBySiteId(JSON.parse(ids)));
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
