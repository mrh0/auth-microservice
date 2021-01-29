import mongoose = require("mongoose");
import bcrypt = require("bcrypt");
import {LoginCredentials, User} from "../model/types";
import { UserSchema } from "../model/schemas";



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