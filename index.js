// const user = require("./models/user");
const express = require("express");
const app = express();
let bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

var BasicDetails = require("./controller/add");

app.get("/basic-form", BasicDetails.BasicForm);
app.post("/basic-details", BasicDetails.BasicDetail);
app.get("/state", BasicDetails.stateDetail);
app.get("/fetch-city", BasicDetails.city);
app.get("/pivot", BasicDetails.InsertPivot);
app.get("/show", BasicDetails.show);

app.listen(8234, () => {
  console.log("Running on 8234");
});
