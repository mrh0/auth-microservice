import jwt = require("jsonwebtoken");
import bcrypt = require("bcrypt");
import {LoginCredentials, User, Response} from "./types";
import db from "./db";

async function signup(credentials: LoginCredentials) {
    try {
        await db.createUser(credentials)
        return {accepted: true} as Response<any>;
    }
    catch(e) {
        return {accepted: false, error: e} as Response<any>;
    }
}

async function login(credentials: LoginCredentials) {
    let user: User;

    if(user = await db.getUser(credentials.username)) {
        if(await bcrypt.compare(process.env.PEPPER + credentials.password, user.hpwd)) {
            const token = jwt.sign({userId: user._id}, process.env.SECRET, {expiresIn: process.env.EXPIRES})
            return {accepted: true, token: token} as Response<any>;
        }
    }
    return {accepted: false, error: "incorrect username or password"} as Response<any>;
}

async function verify(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        return {accepted: true} as Response<any>;
    }
    catch(e) {
        return {accepted: false, error: e} as Response<any>;
    }
}

export default { signup, login, verify };
