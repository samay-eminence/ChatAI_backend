require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 5002;
const app = express();

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json({ limit: "50mb" }));
require("./model/db");

app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
app.use(function(req, res, next) {
  res.setTimeout(500000);
  next();
});

// routes
app.use("/chat", require("./routes/chat"));
app.use("/chatbot", require("./routes/chatbot"));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

