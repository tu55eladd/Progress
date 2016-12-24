var path = require("path");
module.exports = {
  entry: {
    app: ["./src/client/index.ts"]
  },

  output: {
    path: "./build/server/public/",
    filename: "bundle.js"
  },

  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  devtool: "source-map",

  module: {
    loaders: [
      { 
        test: /\.(js|tsx?)$/, 
        loaders: ["babel-loader", "awesome-typescript-loader"],
        exclude: /node_modules/, 
        //query: { presets: ['es2015','react'] }
      },
    ],
    preLoader: [
      { test: /\.js$/, loader: 'source-map-loader' }
    ]
  },

  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};
