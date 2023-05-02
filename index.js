const express = require("express");
const app = express();
let bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

const display = require("./controller/display");
app.get("/state", display.states);
app.get("/form", display.display);
app.get("/fetch-city", display.fetch);
app.post("/basic-details", display.upload.single("image"), display.data);
app.get("/", display.show);
app.get("/get-data", display.get_data);

app.listen(8765, () => {
  console.log("Running on 8765");
});
