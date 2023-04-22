let db = require("../models");
const { name, internet, phone } = require("faker");
// console.log(faker.fullname);
const Contact = db.contact;
const student = db.student;
let addstudent = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    let data = [];
    let contact = [];
    student.__factory = { autoIncrementField: "id" };
    student.id = "";
    let studentId = "";
    for (let i = 0; i < 5; i++) {
      let FirstName = name.firstName();
      let LastName = name.lastName();
      const insertdata = {
        firstName: FirstName,
        lastName: LastName,
      };
      // const contactdata = {
      //   firstName: FirstName,
      //   lastName: LastName,
      //   email: internet.email(),
      //   phone: phone.phoneNumber(),
      //   student_id: studentId,
      // };
      // .then(
        //   function (sid) {
      //     student.findByPk(sid.id).then(function (result) {
      //       console.log(result.dataValues.id[0]);
      //       // studentId = result.dataValues;
      //     });
      //   },
      //   { transaction: t }
      // );
      data.push(insertdata);
      // contact.push(contactdata);
    }
    await student.bulkCreate(data)
    console.log(data);
    // let std = await student.create(data, { transaction: t })
    //   .then(function (sid) {
    //     student.findOne(sid.id).then(function (result) {
    //       studentId = result.dataValues.id;
    //     });
    //   });
    // await Contact.bulkCreate(contact, { transaction: t });
    await t.commit();
    // res.send(data);
  } catch (err) {
    await t.rollback();
    // res.send({ message: err.original.sqlMessage });
    console.log(err);
  }
};
module.exports = { addstudent };
