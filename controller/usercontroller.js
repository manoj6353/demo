var db = require("../models");
const faker = require("faker");
var User = db.user;
var adduser = async (req, res) => {
  try {
    var data = [];
    for (let i = 0; i < 1; i++) {
      const insertdata = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: "complete",
      };
      data.push(insertdata);
    }
    await User.bulkCreate(data);
    // res.status(200).json(manoj.toJSON());
  } catch (err) {
    res.send({ message: err.original.sqlMessage });
    console.log(err.original.sqlMessage);
  }
};
module.exports = { adduser };
