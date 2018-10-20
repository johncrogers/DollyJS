module.exports.generateAppDirectory = applicationName => {
  const { existsSync, mkdirSync } = require("fs");
  let applicationFolder = `./Lab/${applicationName}/`;

  if (!existsSync(applicationFolder)) {
    console.log(`  -> Generating application directory.`);
    mkdirSync(applicationFolder);
  }
};
module.exports.writeConfigFiles = applicationName => {
  console.log(`  -> Writing application configuration files.`);
  const { writeFileSync } = require("fs");
  const templates = require("./templates");
  let applicationFolder = `./Lab/${applicationName}/`;

  for (let file in templates) {
    let contents = templates[file].contents;
    let fileName = templates[file].fileName;
    console.log(`    > Writing ${fileName}`);
    writeFileSync(applicationFolder + fileName, contents);
  }
};
module.exports.installDependencies = applicationName => {
  console.log(`  -> Installing application dependencies.`);
  const { execSync } = require("child_process");
  let applicationFolder = `./Lab/${applicationName}/`;
  let dependencies = [
    "axios",
    "body-parser",
    "cors",
    "express",
    "jquery",
    "knex",
    "pg",
    "react",
    "react-dom",
    "semantic-ui-react",
    "babel-core",
    "babel-loader",
    "babel-preset-es2015",
    "babel-preset-react",
    "nodemon",
    "webpack",
    "helmet"
  ];

  for (let dependency of dependencies) {
    console.log(`    > Now installing ${dependency}`);
    execSync(`npm install ${dependency}`, { cwd: applicationFolder });
  }
};
