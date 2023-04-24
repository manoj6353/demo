var db = require("../models");
const { Op } = require("sequelize");
const { name, internet, phone, address } = require("faker");
const { sequelize } = require("../models");
const User = db.student;
const Contact = db.contact;
const Address = db.address;

const showuser = async (req, res) => {
  try {
    const display = await User.findAll({});
    res.json(display);
    res.send(display);
  } catch (err) {
    res.send(err);
  }
};

const showUser = async (req, res) => {
  try {
    const display = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(display);
  } catch (err) {
    res.json(err);
  }
};

const postuser = async (req, res) => {
  try {
    let data = req.body;
    if (data.length > 1) {
      var display = await User.bulkCreate(data);
    } else {
      var display = await User.create(data);
    }
    res.json(display);
  } catch (err) {
    res.json(err);
  }
};

const deleteuser = async (req, res) => {
  try {
    const display = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(display);
  } catch (err) {
    res.json(err);
  }
};

const updateuser = async (req, res) => {
  try {
    let data = req.body;
    const display = await User.update(data, {
      where: { id: req.params.id },
    });
    res.json({ data: display });
  } catch (err) {
    res.json(err);
  }
};

const getquery = async (req, res) => {
  try {
    const display = await Contact.findAll({
      include: { all: true },
      // where: {
      //   id: {
      //     [Op.or]: [{ id: 2 }, { firstName: "manoj" }],
      //   },
      // },
      // attributes: { include: ["firstName"] },
      // [db.Sequelize.fn("COUNT", db.Sequelize.col("id")), "count"]
      // ],
    });
    res.render("display", { display });
    // res.json(display);
  } catch (err) {
    res.send(err);
  }
};

const InsertUser = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    for (let i = 0; i < 5; i++) {
      firstName = name.firstName();
      lastName = name.lastName();
      const StudentData = await User.create(
        {
          firstName: firstName,
          lastName: lastName,
        },
        { transaction: t }
      );

      let studentid = await StudentData.dataValues.id;

      const ContactData = await Contact.create(
        {
          firstName: firstName,
          lastName: lastName,
          email: internet.email(),
          phone: phone.phoneNumber(),
          student_id: studentid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction: t }
      );
      res.send({ StudentData, ContactData });
    }
    await t.commit();
  } catch (err) {
    await t.rollback();
    res.send(err);
  }
};

const ManytoMany = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    let ids = [];
    for (let i = 0; i < 5; i++) {
      firstName = name.firstName();
      lastName = name.lastName();
      var StudentData = await User.create(
        {
          firstName: firstName,
          lastName: lastName,
        },
        { transaction: t }
      );
      ids.push(StudentData.dataValues.id);
    }
    for (let i = 0; i < ids.length; i++) {
      let min = ids[0];
      let max = ids[ids.length - 1];
      let studentid = Math.random() * (max - min) + min;
      var AddressData = await Address.create(
        {
          fulladdress: address.streetAddress(),
          phonenumber: phone.phoneNumber(),
          student_id: studentid,
        },
        { transaction: t }
      );
      console.log(AddressData);
    }
    res.send({ StudentData, AddressData });
    await t.commit();
  } catch (err) {
    console.log(err);
    await t.rollback();
    res.send(err);
  }
};

const relation = async (req, res) => {
  try {
    const display = await User.findAll({
      include: {
        model: Address,
        // required: false,
        right: true,
      },
      // limit: 2,
      // offset: 1,
      // where: {
      //   id: {
      //     [Op.or]: [{ id: 2 }, { firstName: "manoj" }],
      // },
      // },
      // attributes: { include: ["firstName"] },
      // [db.Sequelize.fn("COUNT", db.Sequelize.col("id")), "count"]
      // ],
    });
    res.json(display);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  showuser,
  showUser,
  postuser,
  deleteuser,
  updateuser,
  getquery,
  InsertUser,
  ManytoMany,
  relation,
};
