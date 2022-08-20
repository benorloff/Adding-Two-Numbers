const express = require("express");
const router = express.Router();
const calculateCtrl = require("../../controllers/calculate");

/*---------- Public Routes ----------*/
router.post("/add", calculateCtrl.add);

/*---------- Protected Routes ----------*/

module.exports = router;
