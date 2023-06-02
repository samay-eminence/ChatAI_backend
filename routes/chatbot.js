const express = require("express");
const router = express.Router();
const chatbotCtrl = require("../controller/chatbot");

router.post("/trainProject", chatbotCtrl.ingestData);

module.exports = router;
