const {Schema, model} = require("mongoose");

function date(){
    const date = new Date(Date.now());
    return date.toDateString();
}

const blogSchema = Schema({
    category : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    body : {
        type : String,
        required : true,
    },
    summary : {
        type : String,
        require : true
    },
    coverImage : {
        type : String,
        required : false,
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "blog-user"
    },
    time : {
        type : String,
        default : date()
    }
},{timestamps : true})

const BLOG = model("blog-content",blogSchema);

module.exports = BLOG;