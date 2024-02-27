const BLOG = require("../models/blog");
const COMMENT = require("../models/comment");
async function handelBlogPage(req,res){
    const user = req.user;
    res.render("blog",{"user" : user});
}

async function handelBlogPost(req,res){
    const {category,title, body, summary} = req.body;
    try {
        await BLOG.create({
            category,
            title,
            body,
            summary,
            coverImage : `/uploads/${req.file.filename}`,
            createdBy : req.user._id,
        })
    } catch (error) {
        return res.render("blog")
    }
    return res.redirect("/")
}

async function handelUserBlogPage(req,res){
    const user = req.user;
    const blogs = await BLOG.find({
        createdBy : user._id});

    return res.render("myBlogs",{"user":user, "blog" : blogs,})
}

async function handelPostPage(req,res){
    const id = req.query.id;
    const user = req.user;
    const post = await BLOG.findOne({_id : id}).populate("createdBy")
    const comment = await COMMENT.find({blogId : id}).populate("createdBy");
    return res.render("myPost",{"post" : post,"user":user,"comment" : comment});
}

async function handelPostComment(req,res){
    const blogId = req.query.id;
    const {content} = req.body;
    try {
        await COMMENT.create({
            content,
            blogId,
            createdBy : req.user._id,
        })
    } catch (error) {
    }
    return res.redirect(`/blog/mypost?id=${blogId}`)
}

module.exports = {
    handelBlogPage,
    handelBlogPost,
    handelUserBlogPage,
    handelPostPage,
    handelPostComment
}