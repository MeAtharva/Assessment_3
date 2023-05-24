var express = require("express");

const app = express();
const Routes = require("./routes/customer");
const config = require("./config/config");
const { request } = require("express");

//Using Routers
app.use("/customer", Routes);

//Declearing port
app.listen(config.port, () => {
  console.log(`listening on port ${config.port}.....`);
});
