console.log(`SERVER INITIALIZE:`);
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(helmet());
server.use(express.static(__dirname + "/../app/dist"));

const controllers = require("./controllers");
for (let controller in controllers) {
  server.use();
}
server.get("/", (request, response) => {
  console.log(`GET <BASE PATH>`);
  response.sendFile(path.join(`${__dirname}/../app/dist/index.html`));
});
const apiRouter = require("./api/api.js").apiRouter;
server.use("/api", apiRouter);
const appRouter = require("./app/app.js").appRouter;
server.use("/app", appRouter);

const port = process.env.PORT || 8080;
server.listen(port, function() {
  console.log(`  -> Listening on port ${port}!`);
});
