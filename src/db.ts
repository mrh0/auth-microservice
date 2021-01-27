import mongoose = require("mongoose");
import bcrypt = require("bcrypt");
import {LoginCredentials} from "./common";

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

export async function createUser(credentials: LoginCredentials) {
    let salt = await bcrypt.genSalt();
    let hpwd = await bcrypt.hash(process.env.PEPPER + credentials.password, salt);

    let id = new mongoose.Types.ObjectId();
    return await new UserSchema({_id: id, username: credentials.username, hpwd: hpwd}).save()
}

export async function findUser(username: string) {
    return await UserSchema.find()
   .where('username').equals(username)
   .select('_id username hpwd')
   .exec()[0] as {_id: mongoose.ObjectId, username: string, hpwd: string} | null;
}