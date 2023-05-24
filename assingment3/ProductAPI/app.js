const Joi = require("joi");
const express = require("express");
const { required } = require("joi");
const config = require("./config/config");
const res = require("express/lib/response");
const Routes = require("./routes/product");

const app = express();

//Using Routers
app.use("/api/product", Routes);

app.listen(config.port, () =>
  console.log(`Listening on port ${config.port}....`)
);
