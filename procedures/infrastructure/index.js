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
module.exports.generateDirectories = applicationName => {
  console.log(`    > Generating directory structure.`);
  const { mkdirSync, existsSync } = require("fs");
  const { directoryStructure } = require("./config.js");
  const pathToApplication = `./Lab/Applications/${applicationName}`;

  function traverseAndBuildFolderStructure(pathToFolder, structure) {
    if (structure.length) {
      for (let folder of structure) {
        let targetFolder = `${pathToFolder}/${folder.name}`;
        let folderExists = existsSync(targetFolder);
        if (!folderExists) {
          console.log(
            `        - Creating ${targetFolder.split(pathToApplication)[1]}`
          );
          mkdirSync(targetFolder);
        }
        if (folder.subfolders.length) {
          let currentFolder = targetFolder;
          traverseAndBuildFolderStructure(currentFolder, folder.subfolders);
        }
      }
    }
  }

  traverseAndBuildFolderStructure(pathToApplication, directoryStructure);
  console.log(`      -> Folders generated!`);
};
module.exports.generateStack = applicationName => {
  console.log(`    > Generating stack file infrastructure.`);
  const { readFileSync, writeFileSync } = require("fs");
  const { directoryStructure } = require("./config.js");
  const pathToApplication = `./Lab/Applications/${applicationName}`;
  const pathToTemplates = `./procedures/infrastructure/templates/stack`;

  function traverseAndGenerateStackFiles(
    pathToFolder,
    pathToTemplate,
    structure
  ) {
    if (structure.length) {
      for (let folder of structure) {
        let targetFolder = `${pathToFolder}/${folder.name}`;
        let templateFolder = `${pathToTemplate}/${folder.name}`;

        if (folder.file) {
          let targetTemplate = `${templateFolder}/${folder.file}`;
          let contents = readFileSync(`${targetTemplate}`, "utf8");
          console.log(
            `        - Creating ${targetTemplate.split(pathToTemplates)[1]}`
          );
          writeFileSync(`${targetFolder}/${folder.file}`, contents);
        }

        if (folder.subfolders.length) {
          let currentFolder = targetFolder;
          let currentTemplateFolder = templateFolder;
          traverseAndGenerateStackFiles(
            currentFolder,
            currentTemplateFolder,
            folder.subfolders
          );
        }
      }
    }
  }

  traverseAndGenerateStackFiles(
    pathToApplication,
    pathToTemplates,
    directoryStructure
  );

  console.log(`      -> Infrastructure generated!`);
};
