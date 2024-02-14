const jwt = require("jsonwebtoken");
const key = "dre8lwod5faYig@fRej1pu5et";

function setUser(user){
    return jwt.sign({
        _id : user._id,
        email : user.email,
    },key);
}

function getUser(token){
    if(!token){
        return null
    }
    try {
        return jwt.verify(token,key);
    } catch (error) {
        return null;
    }
}

module.exports= {
    setUser,
    getUser
}