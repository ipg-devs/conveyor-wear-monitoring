import { createContainer, Lifetime } from "awilix";

module.exports = () => {
  const container = createContainer();

  container.loadModules(["./actions/**/*.js", "./external/*.js", ], {
    cwd: __dirname,
    formatName: "camelCase",
    resolverOptions: {
      lifetime: Lifetime.SINGLETON
    }
  });

  return container;
};
