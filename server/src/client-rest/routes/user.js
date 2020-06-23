import { Router } from "express";
import trike from "trike";
import verifyToken from "../middleware/verifyToken";

const userRouter = new Router();

userRouter
  .get("/", verifyToken, async (req, res, next) => {
    const getAllUsers = req.scope.resolve("getAllUsers");
    const [err, result] = await trike(() => getAllUsers());

    if (err) return next(err);
    return res.json(result);
  })
  .get("/:id", verifyToken, async (req, res, next) => {
    const getUserById = req.scope.resolve("getUserById");
    const [err, result] = await trike(() => getUserById(req.param.id));

    if (err) return next(err);
    return res.json(result);
  })
  .post("/create", verifyToken, async (req, res, next) => {
    const [e1, createUser] = trike(() => req.scope.resolve("createUser"));

    if (e1) return next(e1);
    const { username, password, email, site_id, admin } = req.body;
    const [err, result] = await trike(() =>
      createUser({ username, password, email, site_id, admin })
    );

    if (err) return next(err);
    return res.json(result);
  })
  .post("/update", verifyToken, async (req, res, next) => {
    const updateUser = req.scope.resolve("updateUser");
    const [err, result] = await trike(() => updateUser(req.body.user));

    if (err) return next(err);
    return res.json(result);
  })
  .post("/update-password", verifyToken, async (req, res, next) => {
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
  .post("/destroy", verifyToken, async (req, res, next) => {
    const destroyUser = req.scope.resolve("destroyUser");
    const { id } = req.body.userToDelete;
    const [err, result] = await trike(() => destroyUser(id));

    if (err) return next(err);
    return res.json(result);
  })
  .post("/login", async (req, res, next) => {
    const login = req.scope.resolve("login");
    const { username, password } = req.body;
    const [err, result] = await trike(() => login({ username, password }));

    if (err) return next(err);
    const {token, user} = result;
    return res.json({ token, user });
  });

export default userRouter;
