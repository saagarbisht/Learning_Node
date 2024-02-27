const { verifyToken } = require("../services/authentication");

async function checkForAuthentication(req,res,next){
        const token = req.cookies["token"];
        if(!token) return next();
        try {
            const payload = verifyToken(token);
            req.user = payload;
            return next();
        } catch (error) {}
}

module.exports = {
    checkForAuthentication,
}