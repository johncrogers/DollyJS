const { readdirSync } = require("fs");
readdirSync(__dirname).forEach(file => {
  if (file !== "index.js" && file !== "stack") {
    let exportName = file.split(".")[0];
    module.exports[exportName] = require(`./${file}`);
  }
});
