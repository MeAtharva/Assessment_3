const express = require("express");
const router = express.Router();
const customer = require("../data/Customer.json");
//To get all customer data
router.get("/", (req, res) => {
  res.send(customer);
});

//To get customer data by name
router.get("/:firstName", (req, res) => {
  const cust = customer.find((c) => c.firstName == req.params.firstName);
  if (!cust) {
    res.status(404).send("No costomer with given name ");
  }
  res.send(cust);
});

module.exports = router;
