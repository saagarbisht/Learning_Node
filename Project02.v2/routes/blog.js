const {Router} = require("express");
const multer = require("multer");
const path = require("path");

const {handelBlogPage,handelBlogPost,handelUserBlogPage,handelPostPage, handelPostComment} = require("../controllers/blog");

const router = Router();

const storage = multer.diskStorage({
    destination : function( req, file ,cb){
        cb(null,path.resolve(`./public/uploads/`))
    },
    filename : function(req, file, cb){
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null,fileName)
    }
})

const upload = multer({storage : storage});

router.get("/add",handelBlogPage);
router.post("/add",upload.single("coverImage"),handelBlogPost);
router.get("/myblogs",handelUserBlogPage);
router.get("/mypost",handelPostPage);
router.post("/comment",handelPostComment)


module.exports = router;