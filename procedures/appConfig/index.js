module.exports.generateAppDirectory = projectName => {
  const { existsSync, mkdirSync } = require("fs");
  let projectFolder = `./Lab/${projectName}/`;

  if (!existsSync(projectFolder)) {
    console.log(`  -> Generating application directory.`);
    mkdirSync(projectFolder);
  }
};
module.exports.writeConfigFiles = projectName => {
  console.log(`  -> Writing application configuration files.`);
  const { writeFileSync } = require("fs");
  const templates = require("./templates");
  let projectFolder = `./Lab/${projectName}/`;

  for (let file in templates) {
    let contents = templates[file].contents;
    let fileName = templates[file].fileName;
    console.log(`    > Writing ${fileName}`);
    writeFileSync(projectFolder + fileName, contents);
  }
};
module.exports.installDependencies = projectName => {
  console.log(`  -> Installing application dependencies.`);
  const { execSync } = require("child_process");
  let projectFolder = `./Lab/${projectName}/`;
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
    execSync(`npm install ${dependency}`, { cwd: projectFolder });
  }
};
