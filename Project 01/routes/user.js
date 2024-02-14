const express = require("express");
const {handelSignup, handelLogin} = require("../controllers/user")

const router = express.Router()

router.post("/",handelSignup);
router.post("/login",handelLogin);

module.exports = router;