"use strict";

var _awilix = require("awilix");

module.exports = () => {
  const container = (0, _awilix.createContainer)();
  container.loadModules(["./actions/**/*.js", "./external/*.js"], {
    cwd: __dirname,
    formatName: "camelCase",
    resolverOptions: {
      lifetime: _awilix.Lifetime.SINGLETON
    }
  });
  return container;
};