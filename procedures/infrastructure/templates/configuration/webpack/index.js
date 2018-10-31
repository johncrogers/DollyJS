module.exports.fileName = "webpack.config.js";
module.exports.contents =
  'var path = require("path");' +
  'var SRC_DIR = path.join(__dirname, "app/src/views/");' +
  'var DIST_DIR = path.join(__dirname, "app/dist/scripts");' +
  "\n" +
  "module.exports = {" +
  "  entry: `${SRC_DIR}/Index.jsx`," +
  "  output: {" +
  '    filename: "bundle.js",' +
  "    path: DIST_DIR" +
  "  }," +
  "  module: {" +
  "    loaders: [{" +
  "      test: /.jsx?/," +
  "      include: SRC_DIR," +
  '      loader: "babel-loader",' +
  "      query: {" +
  '        presets: ["react", "es2015"]' +
  "      }" +
  "    }]" +
  "  }" +
  "};";
