const USER = require("../models/user");
const BLOG = require("../models/blog");

async function handelHomePage(req,res){
    const allBlogs = await BLOG.find({}).populate("createdBy").sort({createdAt:-1, updatedAt:-1});
    if(!req.user) return res.render("home",{"blog" : allBlogs});
    const {email,} = req.user;
    const user = await USER.findOne({email});
    if(!user) return res.render("home",{ "blog" : allBlogs});
    return res.render("home",{"user" : user, "blog" : allBlogs})
}

module.exports = {
    handelHomePage,
}