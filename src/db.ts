import mongoose = require("mongoose");
import bcrypt = require("bcrypt");
import {LoginCredentials, User} from "./types";

mongoose.connect("mongodb+srv://kth10:" + process.env.MONGO_ATLAS_PW + "@cluster0-wqtf8.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("mongoose connected!");
});

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, unique:true, required: true, dropDups:true},
    hpwd: {type: String, required: true}
});
const UserSchema = mongoose.model('User', userSchema);

async function createUser(credentials: LoginCredentials) {
    if(await userExist(credentials.username))
        throw "username taken";

    let salt = await bcrypt.genSalt();
    let hpwd = await bcrypt.hash(process.env.PEPPER + credentials.password, salt);

    let id = new mongoose.Types.ObjectId();
    return await new UserSchema({_id: id, username: credentials.username, hpwd: hpwd}).save()
}

async function getUser(username: string) {
    let r = await UserSchema.find()
    .where('username').equals(username).select('_id username hpwd').exec();

    if(r.length == 0)
        throw "not found";
    return {
        _id: r[0].get("_id"),
        username: r[0].get("username"),
        hpwd: r[0].get("hpwd")
    } as User;
}

async function userExist(username: string) {
    let r = await UserSchema.find()
    .where('username').equals(username).select('_id').exec();

    if(r.length == 1)
        return true;
    return false;
}

export default { createUser, getUser, userExist }