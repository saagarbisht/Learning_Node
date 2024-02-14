const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        uniquie : true
    },
    password : {
        type : String,
        required : true
    },
},{timestamps : true})

const USER = mongoose.model("user_data", userSchema);

module.exports = USER;