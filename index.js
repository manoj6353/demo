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
app.get("/fetch-city", BasicDetails.city);
app.get("/one-to-many", BasicDetails.oneToMany);
app.get("/many-delete", BasicDetails.manydelete);
app.get("/many-update", BasicDetails.manyupdate);
app.get("/many-to-many", BasicDetails.manytomany);
app.get("/many-show", BasicDetails.manyshow);
app.get("/update-many", BasicDetails.updatemany);
app.get("/show", BasicDetails.show);
app.get("/image", BasicDetails.images);
app.get("/imageupdate", BasicDetails.imageupdate);
app.get("/imagedelete", BasicDetails.imagedelete);
app.get("/video", BasicDetails.videos);
app.get("/tag", BasicDetails.tags);
app.get("/tagupdate", BasicDetails.tagupdate);
app.get("/showtag", BasicDetails.showtag);

app.listen(8234, () => {
  console.log("Running on 8234");
});
