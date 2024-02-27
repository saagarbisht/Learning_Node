const { Schema, model} = require("mongoose");
const {createHmac, randomBytes} = require("crypto");
const { generateToken } = require("../services/authentication");

const userSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    salt : {
        type : String
    },
    profileImage : {
        type : String,
        default : "/images/default.gif"
    },
    role : {
        type : String,
        enum : ["USER","ADMIN"],
        default : "USER"
    }
})

userSchema.pre("save",function(next){
    const user = this;
    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt)
    .update(user.password)
    .digest("hex")

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

userSchema.static("checkPasswordAndGenerateToken",async function(email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error("user not found");

    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedPassword = createHmac("sha256",salt)
    .update(password)
    .digest("hex")

    if(hashedPassword !== userProvidedPassword) throw new Error("incorrect password")

    const token = generateToken(user);
    return token;
})

const USER = model("blog-user",userSchema);

module.exports = USER;