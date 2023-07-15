const Dotenv = require("dotenv-webpack");

module.exports = {
  // ... other Webpack configuration options ...
  plugins: [new Dotenv()],
};
