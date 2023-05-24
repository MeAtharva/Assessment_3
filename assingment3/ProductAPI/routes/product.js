const Joi = require("joi");
const express = require("express");
const router = express.Router();

const fs = require("fs");

// const app = express();
router.use(express.json());

const products = [
  {
    id: 1,
    productName: "Laptop",
    price: 20000,
  },
  {
    id: 2,
    productName: "Mobile",
    price: 2000,
  },
  {
    id: 3,
    productName: "Pen",
    price: 20,
  },
];

fs.writeFileSync("NewData.json", JSON.stringify(products, null, 1));

//To get all data
router.get("/", (req, res) => {
  const jsondata = fs.readFileSync("./NewData.json");
  res.send(jsondata);
});

//To get particular data by id
router.get("/:id", (req, res) => {
  var jsondata = fs.readFileSync("./NewData.json");
  jsondata = JSON.parse(jsondata);
  const product = products.find((c) => c.id == parseInt(req.params.id));
  if (!product) {
    res.status(404).send("The product with the given id not found");
  }
  res.send(product);
});

//To add new data to json file
router.post("/", (req, res) => {
  var jsondata = fs.readFileSync("./NewData.json");
  jsondata = JSON.parse(jsondata);
  const product = {
    id: jsondata.length + 1,
    productName: req.body.productName,
    price: req.body.price,
  };
  jsondata.push(product);

  fs.writeFileSync("NewData.json", JSON.stringify(jsondata, null, 1));
  res.send(product);
});

//To update data in json file
router.patch("/:id", (req, res) => {
  var jsondata = fs.readFileSync("./NewData.json");
  jsondata = JSON.parse(jsondata);

  var prod = jsondata.find((v) => v.id == parseInt(req.params.id));
  if (!prod) res.status(404).send("product not found");

  prod.id = req.params.id;
  prod.productName = req.body.productName;
  prod.price = req.body.price;
  jsondata.push(prod);
  fs.writeFileSync("NewData.json", JSON.stringify(jsondata, null, 1));
  res.send(prod);
});

//To delete data from json file
router.delete("/:id", (req, res) => {
  var jsondata = fs.readFileSync("./NewData.json");
  jsondata = JSON.parse(jsondata);

  const product = jsondata.find((c) => c.id == parseInt(req.params.id));
  if (!product) {
    res.status(400).send("product with given id is not present");
  }

  if (product) {
    const index = jsondata.indexOf(product);
    delete jsondata[index];
    fs.writeFileSync("NewData.json", JSON.stringify(jsondata, null, 1));

    res.send(product);
  }
});

//Exporting Routes
module.exports = router;
