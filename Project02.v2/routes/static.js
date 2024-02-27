const { Router } = require("express");
const { handelHomePage, } = require("../controllers/static")

const router = Router();

router.get("/",handelHomePage);

module.exports = router;