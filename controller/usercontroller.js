var db = require("../models");
const faker = require("faker");
var User = db.user;
var adduser = async (req, res) => {
  var data = [];
  for (let i = 0; i < 10; i++) {
    const insertdata = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    data.push(insertdata);
}
await User.bulkCreate(data);
  // res.status(200).json(manoj.toJSON());
};
module.exports = { adduser };
