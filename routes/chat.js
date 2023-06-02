const express = require("express");
const router = express.Router();
const chatCtrl = require("../controller/chat");

router.post("/initiate", chatCtrl.handler);

module.exports = router;
