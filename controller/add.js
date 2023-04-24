var db = require("../models/index");
const { Op, DataTypes } = require("sequelize");
const { name, internet, phone, address } = require("faker");
const { sequelize } = require("../models/index");
const Basic = require("../models/candidate_basic")(sequelize, DataTypes);

const BasicForm = async (req, res) => {
  res.render("form");
};

const BasicDetail = async (req, res) => {
  const t = await db.sequelize.transaction();
  const { body } = req;
  try {
    const basic = await Basic.create(
      {
        first_name: body.firstName,
        last_name: body.lastName,
        contact_number: body.contact,
        full_address: body.address,
        city: body.city,
        state: body.state,
        email: body.email,
        dob: body.dateOfBirth,
        gender: body.gender,
      },
      { transaction: t }
    );
    await t.commit();
    return res.json(basic);
  } catch (err) {
    res.send({ message: err });
    await t.rollback();
  }
};

module.exports = {
  BasicDetail,
  BasicForm,
};
