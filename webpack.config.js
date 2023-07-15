const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  plugins: [new Dotenv()],
};
