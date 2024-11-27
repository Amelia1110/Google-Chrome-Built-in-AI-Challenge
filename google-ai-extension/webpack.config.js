const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    popup: "./src/popup/index.tsx",
    content: "./src/content/content.ts",
    background: "./src/background/background.ts", // Entry for background script
  },
  output: {
    path: path.resolve(__dirname, "dist"), // Output to the dist folder
    filename: "[name]/[name].js", // Ensures output to dist/popup/index.js, dist/background/background.js, etc.
    clean: true, // Clears the dist folder before each build
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HTMLPlugin({
      template: "./src/popup/index.html", // Points to the HTML template
      filename: "popup/index.html", // Outputs to dist/popup/index.html
      chunks: ["popup"], // Only include the popup script
    }),
    new CopyPlugin({
      patterns: [
        { from: "manifest.json", to: "manifest.json" }, // Copy manifest to dist
      ],
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
