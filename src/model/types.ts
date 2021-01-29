import mongoose = require("mongoose");

export interface LoginCredentials {
    username: string,
    password: string
}

export interface User {
    _id: mongoose.ObjectId
    username: string,
    hpwd: string
}

export interface Response<T> {
    accepted: boolean,
    error?: string,
    token?: string,
    data?: T
}