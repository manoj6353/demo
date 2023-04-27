var db = require("../models");
const { name, internet } = require("faker");
var User = db.user;
console.log(name.firstName());
var adduser = async (req, res) => {
  try {
    var data = [];
    for (let i = 0; i < 10; i++) {
      const insertdata = User.create({
        first_name: name.firstName(),
        last_name: name.lastName(),
        email: internet.email(),
      });
      // data.push(insertdata);
    }
    res.send("insert");
    // await User.bulkCreate(data);
    // res.redirect("show");
  } catch (err) {
    res.send(err);
  }
};
module.exports = { adduser };
