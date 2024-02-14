const USER = require("../models/user");
const { setUser } = require("../services/auth")
async function handelSignup(req,res){
    const {name, email, password} = req.body;
    USER.create({
        name,
        email,
        password
    })
    return res.redirect("/")
}

async function handelLogin(req,res){
    const body = req.body;
    const userData = await USER.findOne({email : body.email, password : body.password});
    if(!userData) return res.render("login",{"error" : "Invalid Email or Password"})
    const token = setUser(userData);
    res.cookie("token",token);
    return res.redirect("/");
}

module.exports = {
    handelSignup,
    handelLogin
}