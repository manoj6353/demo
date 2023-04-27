var db = require("../models/index");
const { Op, DataTypes } = require("sequelize");
const { name, internet, phone, address } = require("faker");
const { sequelize } = require("../models/index");
const academic = require("../models/").academic;
const select_master = require("../models").select_master;
const option_master = require("../models").option_master;
const select_option = require("../models").select_option;
const Basic = require("../models").candidate_basic;
const Academic = require("../models").academic;
const Exprience = require("../models").exprience;
const Language = require("../models").language;
const Technology = require("../models").technology;
const image = require("../models").image;
const video = require("../models").video;
const comment = require("../models").comment;
const tag = require("../models").tag;
const { tagable } = require("../models");

select_master.hasOne(option_master, { foreignKey: "select_id" });
option_master.belongsTo(select_master, { foreignKey: "select_id" });

Basic.hasMany(Academic, { foreignKey: "candidate_id", constraints: false });
Academic.belongsTo(Basic, { foreignKey: "candidate_id", constraints: false });
Basic.hasMany(Exprience, { foreignKey: "candidate_id", constraints: false });
Exprience.belongsTo(Basic, { foreignKey: "candidate_id", constraints: false });
Basic.hasMany(Language, { foreignKey: "candidate_id", constraints: false });
Language.belongsTo(Basic, { foreignKey: "candidate_id", constraints: false });
Basic.hasMany(Technology, { foreignKey: "candidate_id", constraints: false });
Technology.belongsTo(Basic, { foreignKey: "candidate_id", constraints: false });

const images = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const imageinsert = await image.create(
      {
        title: "abc",
        comments: [
          {
            commenttype: "image",
          },
        ],
      },
      { include: comment },
      { transaction: t }
    );
    res.send(imageinsert);
    await t.commit();
  } catch (err) {
    console.log(err);
    await t.rollback();
  }
};
const videos = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const imageinsert = await video.create(
      {
        title: "xyz",
        comments: [
          {
            commenttype: "ssssss",
          },
        ],
      },
      { include: comment },
      { transaction: t }
    );
    res.send(imageinsert);
    await t.commit();
  } catch (err) {
    console.log(err);
    await t.rollback();
  }
};

const tags = async (req, res) => {
  try {
    const t = await sequelize.transaction();
    const taginsert = await tag.create(
      {
        name: "abc",
        images: [
          {
            title: "ssssss",
          },
        ],
        videos: [
          {
            title: "gsdjhfg",
          },
        ],
      },
      { include: [{ model: video }, { model: image }] },
      { transaction: t }
    );
    res.send(taginsert);
  } catch (err) {
    res.send(err);
  }
};

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
    console.log(basic.id);
    const academic = await Academic.create(
      {
        course: body.course,
        board: body.board,
        year: body.pass,
        percentage: body.per,
        candidate_id: basic.id,
      },
      { transaction: t }
    );
    const exprience = await Exprience.create(
      {
        company_name: body.cname,
        designation: body.wdesig,
        start_date: body.sdate,
        end_date: body.edate,
        candidate_id: basic.id,
      },
      { transaction: t }
    );
    const language = await Language.create({
      language_name: body.hindi,
      reads: body.read || "NO",
      writes: body.write || "NO",
      speaks: body.speak || "NO",
      candidate_id: basic.id,
    });
    // const technology = await Technology.create({
    //   technology_name: body.php,
    //   rating: body.rating,
    //   candidate_id: basic.id,
    // });
    await t.commit();
    res.json(basic);
    // res.redirect("show");
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
  images,
  videos,
  tags,
};
