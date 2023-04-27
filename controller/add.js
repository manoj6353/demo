var db = require("../models/index");
const { Op, DataTypes } = require("sequelize");
const { name, internet, phone, address } = require("faker");
const { sequelize } = require("../models/index");
const academic = require("../models/academic");
const select_master = require("../models/select_master")(sequelize, DataTypes);
const option_master = require("../models/option_master")(sequelize, DataTypes);
const select_option = require("../models/select_option")(sequelize, DataTypes);
const Basic = require("../models/candidate_basic")(sequelize, DataTypes);
const Academic = require("../models/academic")(sequelize, DataTypes);
const Exprience = require("../models/exprience")(sequelize, DataTypes);
const Language = require("../models/language")(sequelize, DataTypes);
const Technology = require("../models/technology")(sequelize, DataTypes);

select_master.hasOne(option_master, { foreignKey: "select_id" });
option_master.belongsTo(select_master, { foreignKey: "select_id" });

// Basic.hasMany(Academic, { foreignKey: "candidate_id", constraints: false });
// Academic.belongsTo(Basic, { foreignKey: "candidate_id", constraints: false });
// Basic.hasMany(Exprience, { foreignKey: "candidate_id", constraints: false });
// Exprience.belongsTo(Basic, { foreignKey: "candidate_id", constraints: false });
// Basic.hasMany(Language, { foreignKey: "candidate_id", constraints: false });
// Language.belongsTo(Basic, { foreignKey: "candidate_id", constraints: false });
// Basic.hasMany(Technology, { foreignKey: "candidate_id", constraints: false });
// Technology.belongsTo(Basic, { foreignKey: "candidate_id", constraints: false });

// sequelize.sync({ alter: true });

const InsertPivot = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const select = await select_master.create(
      {
        select_name: address.state(),
      },
      { transaction: t }
    );
    const option = await option_master.create(
      {
        option_name: "address.cityName()",
        select_id: select.dataValues.id,
      },
      { transaction: t }
    );
    const select_options = await select_option.create(
      {
        select_id: select.dataValues.id,
        option_id: option.dataValues.id,
      },
      { transaction: t }
    );
    await t.commit();
  } catch (err) {
    await t.rollback();
    res.send(err);
  }
};

const stateDetail = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    // const state = await select_master.create(
    //   {
    //     select_name: address.state(),
    //   },
    //   { transaction: t }
    // );
    let max = 1;
    let min = 40;
    const city = await option_master.create(
      {
        option_name: address.cityName(),
        select_id: Math.random() * (max - min) + min,
      },
      { transaction: t }
    );
    res.send({ city });
    t.commit();
  } catch (err) {
    t.rollback();
    res.send(err);
  }
};

const city = async (req, res) => {
  const state = req.query.id;
  const city = await select_master.findAll({
    include: { model: option_master, required: true, right: true },
    where: { select_name: state },
  });
  res.json(city);
};

const BasicForm = async (req, res) => {
  const state = await select_master.findAll({});
  const course = await select_master.findAll({
    include: { model: option_master },
    where: { id: 87 },
  });
  res.render("form", { state, course });
};

const BasicDetail = async (req, res) => {
  const t = await db.sequelize.transaction();
  const { body } = req;
  console.log(body);
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
    const academic = await Academic.create({});
    await t.commit();
    res.redirect("show");
  } catch (err) {
    res.send({ message: err });
    await t.rollback();
  }
};

const show = async (req, res) => {
  const basic = await Basic.findAll();
  res.render("show", { basic });
};

module.exports = {
  BasicDetail,
  BasicForm,
  stateDetail,
  city,
  InsertPivot,
  show,
};
