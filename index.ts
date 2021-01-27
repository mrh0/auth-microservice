import secrets from "./src/secrets";
import selfTest from "./test";
import http = require('http');
import express = require("express");

import bodyParser = require("body-parser");
import morgan = require("morgan");
console.log("Start");
secrets();
selfTest();


const app = express();
const router = express.Router();

router.post("/signup", (req, res, next) => {
    
})

app.use("auth", router);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);