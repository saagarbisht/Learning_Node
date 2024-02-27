const USER = require("../models/user");

async function handelSignupPage(req,res){
    return res.render("signup")
}
async function handelSignupData(req,res){
    const {username, email, password} = req.body;
    try {
        await USER.create({
            username,
            email,
            password
        })
    } catch (error) {
        return res.render("signup", {"error" : "user already exists"})
    }
    return res.redirect("/");
}

async function handelLoginPage(req,res){
    return res.render("login")
}

async function handelLoginData(req,res){
    const {email,password} = req.body;
    try {
        const token = await USER.checkPasswordAndGenerateToken(email,password);
        return res.cookie("token",token).redirect("/");
    } catch (error) {
        return res.render("login",{"error" : error.message})
    }
}

async function handelLogout(req,res){
    res.clearCookie("token").redirect("/");
    
}

module.exports = {
    handelSignupPage,
    handelSignupData,
    handelLoginPage,
    handelLoginData,
    handelLogout,
}