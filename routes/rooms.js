var express = require('express');
var router = express.Router();
const roomcontrol = require("../controller/roomcontroller");
const middleware = require("../middleware/middleware");

router.post('/fight/:IdRoom', middleware.authentication, roomcontrol.fight);
router.post('/join/:IdRoom',  middleware.authentication,roomcontrol.join);
router.post('/create', middleware.authentication,roomcontrol.createroom);

module.exports = router;