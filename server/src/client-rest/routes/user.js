import { Router } from "express";
import trike from "trike";

const userRouter = new Router();

userRouter
  .get("/", async (req, res, next) => {
    const getAllUsers = req.scope.resolve("getAllUsers");
    const [err, result] = await trike(() => getAllUsers());

    if (err) return next(err);
    return res.json(result);
  })
  .get("/:id", async (req, res, next) => {
    const getUserById = req.scope.resolve("getUserById");
    const [err, result] = await trike(() => getUserById(req.param.id));

    if (err) return next(err);
    return res.json(result);
  })
  .post("/create", async (req, res, next) => {
    const [e1, createUser] = trike(() => req.scope.resolve("createUser"));

    if (e1) return next(e1);
    const { username, password, email, site_id, admin } = req.body;
    const [err, result] = await trike(() =>
      createUser({ username, password, email, site_id, admin })
    );

    if (err) return next(err);
    return res.json(result);
  })
  .post("/update", async (req, res, next) => {
    const updateUser = req.scope.resolve("updateUser");
    const [err, result] = await trike(() => updateUser(req.body.user));

    if (err) return next(err);
    return res.json(result);
  })
  .post("/update-password", async (req, res, next) => {
    const { username, newPassword } = req.body;
    console.log(req.body);
    const updatePassword = req.scope.resolve("updatePassword");
    const [err, result] = await trike(() =>
      updatePassword({ username, newPassword })
    );

    console.log(err || "no error");

    if (err) return next({ message: "Error updating password" });
    console.log(result);
    res.send({ success: true });
  })
  .post("/destroy", async (req, res, next) => {
    const destroyUser = req.scope.resolve("destroyUser");
    const { id } = req.body.userToDelete;
    const [err, result] = await trike(() => destroyUser(id));

    if (err) return next(err);
    return res.json(result);
  })

export default userRouter;
