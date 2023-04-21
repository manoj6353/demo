const user = require("./models/user");
const express = require("express");
const app = express();
let bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

var usercontrol = require("./controller/usercontroller");
var showcontrol = require("./controller/show");
var delcontrol = require("./controller/deletecontrol");
var searchcontrol = require("./controller/search");

app.get("/insert", usercontrol.adduser);
app.get("/show", showcontrol.show);
app.get("/del/:id", delcontrol.del);
app.post("/search", searchcontrol.search);

require("./models");

app.listen(8234, () => {
  console.log("Running on 8234");
});
