var db = require("../models");
const { name, internet } = require("faker");
var User = db.user;
console.log(name.firstName());
var adduser = async (req, res) => {
  try {
    var data = [];
    for (let i = 0; i < 10; i++) {
      const insertdata = {
        first_name: name.firstName(),
        last_name: name.lastName(),
        email: internet.email(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      data.push(insertdata);
    }
    await User.bulkCreate(data);
    // res.redirect("show");
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};
module.exports = { adduser };
