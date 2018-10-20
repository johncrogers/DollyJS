const { appConfig } = require("./procedures");
let projectName = process.argv[2];

console.log(`GENERATING APPLICATION: ${projectName}`);
appConfig.generateAppDirectory(projectName);
appConfig.writeConfigFiles(projectName);
appConfig.installDependencies(projectName);
