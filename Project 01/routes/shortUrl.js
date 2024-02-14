const express = require("express");
const  { handelUrlGenratings,handelRedirect,handelAnalytics } = require("../controllers/shortUrl")

const router = express.Router();

router.post("/",handelUrlGenratings);
router.get("/:uid",handelRedirect);
router.get("/analytics/:uid",handelAnalytics);

module.exports = router;