export interface LoginCredentials {
    username: string,
    password: string
}

export interface User {
    username: string,
    hpwd: string,
    salt: string
}