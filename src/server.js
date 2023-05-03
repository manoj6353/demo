const express = require("express");
const path = require("path");
let bodyParser = require("body-parser");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "/views"));
const router = require("./routes/routes");
app.use("/", router);

app.listen(8765, () => {
  console.log("Running on 8765");
});
