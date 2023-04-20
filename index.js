const user = require("./models/user");
const express = require("express");
const app = express();

var usercontrol = require('./controller/usercontroller');
var showcontrol = require('./controller/show');

app.get('/insert',usercontrol.adduser);
app.get('/show',showcontrol.show);

require("./models");
app.listen(8234, () => {
  console.log("Running on 8234");
});
