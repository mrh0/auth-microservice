import mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, unique:true, required: true, dropDups:true},
    hpwd: {type: String, required: true}
});
export const UserSchema = mongoose.model('User', userSchema);