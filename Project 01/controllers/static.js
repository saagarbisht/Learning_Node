const URL = require("../models/shortUrl");

async function handelHomeRender(req,res){
    if(!req.user) return res.render("auth")

    const userData = await URL.find({user : req.user._id});
    return res.render("home", {"data" : userData});
}

async function handelSignupRender(req,res){
    return res.render("signup");
}
async function handelLoginRender(req,res){
    return res.render("login");
}

module.exports = {
    handelHomeRender,
    handelSignupRender,
    handelLoginRender
}
