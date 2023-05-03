const express = require("express");
const route = express.Router();

const display = require("../controller/display");

route.get("/state", display.states);
route.get("/form", display.display);
route.get("/fetch-city", display.fetch);
route.post("/basic-details", display.upload.single("image"), display.data);
route.get("/", display.show);
route.get("/get-data", display.get_data);

module.exports = route;
