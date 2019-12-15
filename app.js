const express = require('express');
const app = require("express")();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require('path');

dotenv.config();

app.use(bodyParser.json());
app.use("/", require("./routes/routes"));

app.use(express.static(path.join(process.cwd(), '/public')));
app.use(express.static(path.join(process.cwd(), '/view')));

app.listen(3000, () => {
  console.log("Serving the tea");
});
