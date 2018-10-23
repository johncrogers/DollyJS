const { readdirSync } = require("fs");
readdirSync(__dirname).forEach(file => {
  if (file !== "index.js") {
    let exportName = file.split(".")[0];
    // make file an interpolated variable
    module.exports[exportName] = require(`./${file}`);
  }
});
