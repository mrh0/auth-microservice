import auth from "./src/auth";
import { LoginCredentials } from "./src/types";
export default async function selfTest(params = {}) {

    let login: LoginCredentials = {username: "Test3", password: "pwd"};

    // SignUp
    console.log("signup:", await auth.signup(login));

    // Login
    let loginResult = await auth.login(login);
    console.log("login:", loginResult);

    // Verify Login token
    if(loginResult.accepted) {
        let verifyResult = await auth.verify(loginResult.token)
        console.log("verify:", verifyResult);
    }
}