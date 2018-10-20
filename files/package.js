module.exports.fileName = "package.json";
module.exports.contents = `{
  "name": "${process.argv[2]}",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start:webpack": "webpack -d --watch",
    "start:server": "nodemon server/index.js",
    "task": "node ./_util/tasks/_runner.js"
  },
  "devDependencies": {
    "babel-core": "^6.23.1",
    "babel-loader": "^6.3.2",
    "babel-preset-es2015": "^6.22.0",
    "babel-preset-react": "^6.23.0",
    "body-parser": "^1.18.3",
    "cors": "^2.8.4",
    "express": "^4.16.4",
    "helmet": "^3.14.0",
    "knex": "^0.14.6",
    "nodemon": "^1.17.3",
    "pg": "^7.5.0",
    "webpack": "^2.2.1"
  },
  "dependencies": {
    "axios": "^0.18.0",
    "jquery": "^3.3.1",
    "react": "^15.4.2",
    "react-dom": "^15.4.2",
    "semantic-ui-react": "^0.82.5"
  }
}
`;
