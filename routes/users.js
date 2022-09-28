var express = require('express');
var router = express.Router();
const usercontrol = require("../controller/usercontroller");
const middleware = require("../middleware/middleware");

router.post('/register', usercontrol.register);
router.post('/login', usercontrol.login);
router.get('/history', middleware.authentication , usercontrol.findhistory);

module.exports = router;