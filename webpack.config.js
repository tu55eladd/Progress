var path = require("path");
module.exports = {
  entry: {
    app: ["./src/index.js"]
  },

  output: {
    path: path.resolve(__dirname, "build"),
    //publicPath: "/assets/",
    filename: "bundle.js"
  },
  devtool: "source-map",
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
};
