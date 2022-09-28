var express = require('express');
var router = express.Router();
const admincontroller = require("../controller/admincontroller");
const middleware = require("../middleware/middleware");

router.get("/", middleware.authorization,admincontroller.users)
router.get("/rooms", middleware.authorization,admincontroller.rooms)
router.get("/history", middleware.authorization,admincontroller.history)

module.exports = router;