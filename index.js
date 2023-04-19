const user = require("./models/user");
const express = require("express");
const app = express();

var usercontrol = require('./controller/usercontroller')

app.get('/',usercontrol.adduser);


require("./models");
app.listen(8234, () => {
  console.log("Running on 8234");
});
