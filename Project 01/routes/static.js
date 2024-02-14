const express = require("express");
const { handelHomeRender,handelSignupRender,handelLoginRender } = require("../controllers/static")

const router = express.Router();

router.get("/",handelHomeRender);
router.get("/signup",handelSignupRender);
router.get("/login",handelLoginRender);

module.exports = router;