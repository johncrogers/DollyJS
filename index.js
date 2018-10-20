// import procedures as module.
// run procedures as promise chain
// make app config modular - import projects directory
const { existsSync, mkdirSync, writeFileSync } = require("fs");
const { execSync } = require("child_process");
const { paths, files, dependencies } = require("./config");

let projectName = process.argv[2];
let projectFolder = `${__dirname}/Lab/${projectName}/`;

console.log(`CREATING NEW PROJECT: ${projectName}`);
if (!existsSync(projectFolder)) {
  console.log(`  -> Generating project folder.`);
  mkdirSync(projectFolder);
}

// Write base files.
console.log(`  Procedure: Build Application Configuration`);
for (let file in files) {
  let contents = files[file].contents;
  let fileName = files[file].fileName;
  console.log(`    -> Writing ${fileName}`);
  writeFileSync(projectFolder + fileName, contents);
}
// Install dependencies.
console.log(`  Procedure: Install Dependencies`);
for (let dependency of dependencies) {
  console.log(`    -> Installing ${dependency}`);
  execSync(`npm install ${dependency}`, { cwd: projectFolder });
}
// Write utility.
