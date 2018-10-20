const { readdirSync } = require("fs");
readdirSync(__dirname).forEach(file => {
  if (file !== "index.js") {
    let exportName = file.split(".")[0];
    module.exports[exportName] = require(`./${file}`);
  }
});
module.exports.resolveConfigurationPath = () => {
  const { existsSync } = require("fs");
  let applicationName = process.argv[2];
  let pathToConfiguration = `./Lab/Configurations/${applicationName}`;
  let configExists = existsSync(pathToConfiguration);
  console.log(
    `  > Checking for configuration in /Lab/Configurations/${applicationName}...`
  );
  if (configExists) {
    console.log(`    -> Configuration found!`);
    console.log(`  > Loading configuration...`);
    return pathToConfiguration;
  } else {
    console.log(`    -> No configuration found!`);
    console.log(
      `    -> Please visit the README for instructions on how to build an application configuration.`
    );
    console.log(`  > Exiting DollyJS.`);
    process.exit();
  }
};
