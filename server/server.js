"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _main = _interopRequireDefault(require("./app/main"));

var _routes = _interopRequireDefault(require("./client-rest/routes"));

var _requestLogger = _interopRequireDefault(require("./client-rest/middleware/request-logger"));

var _process = _interopRequireDefault(require("process"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const environment = _process.default.env.NODE_ENV || 'development';
const container = (0, _main.default)();

function rootHandler(app) {
  if (environment === "production") {
    console.log("************** using production route **************");
    app.use(_express.default.static(_path.default.join(__dirname, 'public')));
  } else {
    app.get("/", (req, res) => {
      res.send("hello");
    });
  }
}

module.exports = (port = 5000) => {
  const app = (0, _express.default)();
  app.use((0, _cors.default)({
    origin: environment === "production" ? [/ipg-app\.herokuapp\.com/, /\.pink-shrimp-90\.telebit\.io$/] : '*'
  }));
  app.use((req, _res, next) => {
    req.scope = container.createScope();
    return next();
  });
  app.use(_express.default.json());
  app.use(_requestLogger.default);
  rootHandler(app);
  app.use("/api", _routes.default);
  app.use("/login", async (req, res, next) => {
    const login = req.scope.resolve("login");
    const {
      username,
      password
    } = req.body;
    const result = await login({
      username,
      password
    });
    if (!result) return next({
      status: 503,
      message: 'error logging in'
    });
    const {
      token,
      user
    } = result;
    return res.json({
      token,
      user
    });
  }); // Error handling middleware

  app.use((err, _req, res, _next) => {
    const {
      status = 500,
      message = "Unknown Error Occured"
    } = err;
    return res.status(status).json({
      error: message
    });
  });
  const server = app.listen(port, () => console.log(`Server running on port ${port}`));
  return server;
};