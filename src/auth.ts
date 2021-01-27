import jwt = require("jsonwebtoken");
import bcrypt = require("bcrypt");
import secrets from "./secrets";
import {LoginCredentials, User} from "./common";

async function signUp(credentials: LoginCredentials) {
    
    // ...
}

async function login(credentials: LoginCredentials) {
    // get user from db:
    let user: User;
    if(user) {
        if(await bcrypt.compare(credentials.password, user.hpwd)) {
            
        }
        else {

        }
    }
}