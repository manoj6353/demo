const express = require("express");
const path = require("path");
let bodyParser = require("body-parser");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));
app.set("views", path.join(__dirname, "/views"));
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.json")[env];

const router = require("./routes/routes");
app.use("/", router);

app.listen(config.port, () => {
  console.log(`Running on ${config.port}`);
});
