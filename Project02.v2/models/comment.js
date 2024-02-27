const {Schema, model} = require("mongoose");

function date(){
    const date = new Date(Date.now());
    return date.toDateString();
}

const commentSchema = new Schema({
    content : {
        type : String,
        requred : true
    },
    blogId : {
        type : Schema.Types.ObjectId,
        ref : "blog-content",
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref  : "blog-user",
    },
    time : {
        type : String,
        default : date()
    }
},{timestamps : true})

const COMMENT = model("blog-comment",commentSchema);

module.exports = COMMENT;