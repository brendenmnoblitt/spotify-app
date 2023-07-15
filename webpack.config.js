const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/main.js",
  plugins: [new Dotenv()],
};
