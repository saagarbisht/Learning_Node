const jwt = require("jsonwebtoken");
const key = "st2&Exi2i2u6rlswo?uY4BrU9apicrdeNuj*0AXO0ehLFRis_EF+1R4sT5s_";

function generateToken(user){
    const payload = {
        _id : user._id,
        username : user.username,
        email : user.email,
        profileImage : user.profileImage,
        role : user.role,
    }
    const token = jwt.sign(payload,key);
    return token;
};

function verifyToken(token){
    const payload = jwt.verify(token,key);
    return payload; 
}

module.exports = {
    generateToken,
    verifyToken
}