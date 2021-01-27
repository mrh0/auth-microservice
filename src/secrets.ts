import fs = require("fs");

interface Secrets {
    pepper: string,
    mongodb_pwd: string
};

export default function load() {
    let json = fs.readFileSync(__dirname + '/../secrets.json', 'utf8');
    let secrets: Secrets = JSON.parse(json);
    
    process.env.MONGO_ATLAS_PW = secrets.mongodb_pwd;
    process.env.HASH_PEPPER = secrets.pepper;
}