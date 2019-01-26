console.log(`SERVER INITIALIZE:`);
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(helmet());
server.use(express.static(__dirname + "/../app/dist"));

const controllers = require("./controllers").controllers().router;
server.use("/", controllers);

const port = process.env.PORT || 8080;
server.listen(port, function() {
  console.log(`SERVER LISTEN: Port ${port}`);
});
