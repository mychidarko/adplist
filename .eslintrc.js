module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-adplist`
  extends: ["adplist"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
