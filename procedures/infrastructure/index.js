module.exports.generateAppDirectory = applicationName => {
  const { existsSync, mkdirSync } = require("fs");
  let applicationFolder = `./Lab/Applications/${applicationName}/`;

  if (!existsSync(applicationFolder)) {
    console.log(`    -> Generating application directory.`);
    mkdirSync(applicationFolder);
  }
};

module.exports.writeConfigFiles = applicationName => {
  console.log(`    > Writing application configuration files.`);
  const { writeFileSync } = require("fs");
  const { configuration } = require("./templates");
  let applicationFolder = `./Lab/Applications/${applicationName}/`;

  for (let file in configuration) {
    let contents = configuration[file].contents;
    let fileName = configuration[file].fileName;
    console.log(`        - Writing ${fileName}`);
    writeFileSync(applicationFolder + fileName, contents);
  }
  console.log(`      -> Files written!`);
};

module.exports.installDependencies = applicationName => {
  console.log(`    > Installing application dependencies.`);
  const { execSync } = require("child_process");
  const { dependencies } = require("./config.js");
  let applicationFolder = `./Lab/Applications/${applicationName}/`;

  for (let dependency of dependencies) {
    console.log(`      > Now installing ${dependency}...`);
    execSync(`npm install ${dependency}`, { cwd: applicationFolder });
  }
};

module.exports.generateStackInfrastructure = applicationName => {
  console.log(`    > Generating stack infrastructure.`);
  const {
    existsSync,
    readdirSync,
    readFileSync,
    mkdirSync,
    writeFileSync
  } = require("fs");
  const pathToTemplates = `./procedures/infrastructure/templates/stack`;
  const pathToApplication = `./Lab/Applications/${applicationName}`;
  function hasContents(path) {
    return readdirSync(path).length ? true : false;
  }

  function traverseTemplates(targetPath) {
    let currentLocationInTemplates = targetPath.split(pathToTemplates)[1];
    let newDirectoryPath = `${pathToApplication}${currentLocationInTemplates}`;
    console.log(`       - Creating directory ${newDirectoryPath}`);
    if (!existsSync(newDirectoryPath)) {
      mkdirSync(newDirectoryPath);
    }
    if (hasContents(targetPath)) {
      let directoryContents = readdirSync(targetPath);

      for (let item of directoryContents) {
        let isFolder = !item.includes(".");
        let isFile = item.includes(".");

        if (isFolder) {
          let folderToCheck = `${targetPath}/${item}`;
          traverseTemplates(folderToCheck);
        }

        if (isFile) {
          let pathToWrite = `${pathToApplication}${currentLocationInTemplates}/${item}`;
          let fileContents = readFileSync(`${targetPath}/${item}`);
          console.log(`       - Creating file ${pathToWrite}`);
          writeFileSync(pathToWrite, fileContents);
        }
      }
    }
  }

  traverseTemplates(pathToTemplates);
  console.log(`      -> Folders generated!`);
};
module.exports.generateFirstBundle = applicationName => {
  console.log(`    > Generating first bundle.`);
  const { execSync } = require("child_process");
  let applicationFolder = `./Lab/Applications/${applicationName}`;

  execSync(
    `webpack ${applicationFolder}/app/src/views/Index.jsx ${applicationFolder}/app/dist/scripts/bundle.js`,
    { cwd: applicationFolder }
  );
};
