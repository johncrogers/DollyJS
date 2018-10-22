const { resolveConfigurationPath, infrastructure } = require("./procedures");

let openingMessage =
  "======================================\n" +
  "  DollyJS: Thanks for using DollyJS!\n" +
  "    Repository: github.com/repo\n" +
  "    Documentation: github.com/docs\n" +
  "    Getting Started: README\n" +
  "======================================\n";
console.log(openingMessage);

const { applicationName } = require(resolveConfigurationPath());
infrastructure.generateAppDirectory(applicationName);
infrastructure.writeConfigFiles(applicationName);
// infrastructure.installDependencies(applicationName);
infrastructure.generateDirectories(applicationName);
infrastructure.generateStack(applicationName);
