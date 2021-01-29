import secrets from "./src/secrets";
import selfTest from "./test";
import http = require('http');
import express = require("express");
import bodyParser = require("body-parser");
import morgan = require("morgan");
import mongoose = require("mongoose");
import { router } from "./src/api/routes/view";

console.log("Start");
secrets();

mongoose.connect("mongodb+srv://dbUser:"+process.env.MONGO_ATLAS_PW+"@cluster0.wqtf8.mongodb.net/auth?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    selfTest();
})


const app = express();

app.use("auth", router);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);