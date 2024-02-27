const {Router} = require("express");
const { handelSignupPage, handelSignupData, handelLoginPage, handelLoginData, handelLogout} = require("../controllers/user");

const router = Router();

router.get("/signup",handelSignupPage)
router.post("/signup",handelSignupData)

router.get("/login",handelLoginPage)
router.post("/login",handelLoginData)

router.get("/logout",handelLogout)

module.exports = router;