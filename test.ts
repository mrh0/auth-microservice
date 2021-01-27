import {db, createUser, findUser} from "./src/db";
export default function selfTest(params = {}) {
    createUser({username: "Test", password: "pwd"}).then(console.log).catch(console.error);
}