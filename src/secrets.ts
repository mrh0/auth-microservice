import fs = require("fs");

interface Secrets {
    secret: string
};

let json = fs.readFileSync(__dirname + '/secrets.json', 'utf8');
let secrets: Secrets = JSON.parse(json);

export default secrets;