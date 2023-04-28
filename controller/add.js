var db = require("../models/index");
const { Op, DataTypes, where, Association } = require("sequelize");
const { name, internet, phone, address } = require("faker");
const { sequelize } = require("../models/index");
const { resolveInclude } = require("ejs");
const { select_master } = require("../models");
const { option_master } = require("../models");
const { select_option } = require("../models");
const { candidate_basic } = require("../models");
const { academic } = require("../models");
const { exprience } = require("../models");
const { language } = require("../models");
const { technology } = require("../models");
const { image } = require("../models");
const { video } = require("../models");
const { comment } = require("../models");
const { tag } = require("../models");
const { student } = require("../models");
const { classes } = require("../models");
const { enrollment } = require("../models");
const { tagable } = require("../models");

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

const imageupdate = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const imageinsert = await image.update(
      {
        title: "Bajiya",
      },
      { where: { id: 30 } },
      { include: comment },
      { transaction: t }
    );
    console.log(imageinsert);
    await t.commit();
  } catch (err) {
    console.log(err);
    await t.rollback();
  }
};

const imagedelete = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const imageinsert = await image.destroy(
      { where: { id: 30 } },
      { transaction: t }
    );
    const imagedelete = await comment.destroy(
      { where: { id: 30, commenttype: "image" } },
      { transaction: t }
    );
    res.json(imagedelete, imageinsert);
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
    const type = req.query.type || "image";
    console.log(type);
    const t = await sequelize.transaction();
    if (type == "image") {
      const taginsert = await image.create(
        {
          title: "ssssss",
          tags: [
            {
              name: "abc",
            },
          ],
        },
        { include: { all: true } },
        { transaction: t }
      );
      res.json(taginsert);
    }
    if (type == "video") {
      const taginsert = await video.create(
        {
          title: "ssssss",
          tags: [
            {
              name: "abc",
            },
          ],
        },
        { include: { all: true } },
        { transaction: t }
      );
      res.json(taginsert);
    }
  } catch (err) {
    res.send(err);
  }
};

const tagupdate = async (req, res) => {
  const t = await sequelize.transaction();
  const type = req.query.type || "image";
  const id = req.query.id;
  try {
    if (type == "image") {
      const [find] = await tagable.findAll({
        where: { taggableid: id, taggabletype: "image" },
      });
      const tags = await tag.destroy({
        where: { id: find.tagid },
      });
      const images = await image.destroy({
        where: { id: find.taggableid },
      });
      const tagables = await tagable.destroy({
        where: { tagid: find.tagid },
      });
      const taginsert = await image.create(
        {
          title: "ssssss",
          tags: [
            {
              name: "abc",
            },
          ],
        },
        { include: { all: true } },
        { transaction: t }
      );
      res.json(taginsert);
    }
    if (type == "video") {
      const [find] = await tagable.findAll({
        where: { taggableid: id, taggabletype: "video" },
      });
      const tags = await tag.destroy({
        where: { id: find.tagid },
      });
      const videos = await video.destroy({
        where: { id: find.taggableid },
      });
      const tagables = await tagable.destroy({
        where: { tagid: find.tagid },
      });
      const taginsert = await video.create(
        {
          title: "ssssss",
          tags: [
            {
              name: "abc",
            },
          ],
        },
        { include: { all: true } },
        { transaction: t }
      );
      res.json(taginsert);
    }
    await t.commit();
  } catch (err) {
    console.log(err);
    await t.rollback();
  }
};

const showtag = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const tagshow = await tag.findAll(
      {
        include: { all: true, required: true, right: true },
      },
      { transaction: t }
    );
    res.json(tagshow);
    await t.commit();
  } catch (err) {
    console.log(err);
    await t.rollback();
  }
};

const oneToMany = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const select = await select_master.create(
      {
        select_name: address.state(),
        option_masters: [
          {
            option_name: address.city(),
          },
        ],
      },
      { include: [option_master] },
      { transaction: t }
    );
    res.json(select);
    await t.commit();
  } catch (err) {
    res.send(err);
    await t.rollback();
  }
};

const manydelete = async (req, res) => {
  const id = req.query.id;

  const t = await sequelize.transaction();
  try {
    const select = await select_master.destroy(
      {
        where: { id: id },
      },
      { transaction: t }
    );
    const option = await option_master.destroy(
      {
        where: { select_id: id },
      },
      { transaction: t }
    );
    res.send({ select, option });
    await t.commit();
  } catch (err) {
    res.send(err);
    await t.rollback();
  }
};

const manyupdate = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const select = await select_master.update(
      {
        select_name: address.state(),
      },
      { where: { id: 3 } },
      { include: [option_master] },
      { transaction: t }
    );
    res.json(select);
    await t.commit();
  } catch (err) {
    res.send(err);
    await t.rollback();
  }
};

const manytomany = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const manyinsert = await student.create(
      {
        firstname: name.firstName(),
        lastname: name.lastName(),
        classes: [
          {
            title: "B.COM",
          },
          {
            title: "MCA",
          },
        ],
      },
      { include: [{ model: classes }] },
      { transaction: t }
    );
    res.json(manyinsert);
    await t.commit();
  } catch (err) {
    res.send(err);
    await t.rollback();
  }
};

const manyshow = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const manyinsert = await student.findAll(
      {
        include: { all: true, required: true, right: true },
      },
      { transaction: t }
    );
    res.json(manyinsert);
    await t.commit();
  } catch (err) {
    res.send(err);
    await t.rollback();
  }
};

const updatemany = async (req, res) => {
  const t = await sequelize.transaction();
  const id = req.query.id || req.params.id;
  try {
    const find = await enrollment.findAll({
      where: { studentId: id },
    });
    for (let i = 0; i < find.length; i++) {
      const clsid = find[i].dataValues.classId;
      const classdelete = await classes.destroy(
        {
          where: { id: clsid },
        },
        { transaction: t }
      );
    }
    const manydelete = await student.destroy(
      {
        where: { id: id },
      },
      { transaction: t }
    );
    const manyinsert = await student.create(
      {
        firstname: name.firstName(),
        lastname: name.lastName(),
        classes: [
          {
            title: "B.COM",
          },
          {
            title: "MCA",
          },
        ],
      },
      { include: [{ model: classes }] },
      { transaction: t }
    );
    res.json(manyinsert);
    await t.commit();
  } catch (err) {
    console.log(err);
    res.json(err);
    await t.rollback();
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
    where: { id: 26 },
  });
  res.render("form", { state, course });
};

const BasicDetail = async (req, res) => {
  const t = await db.sequelize.transaction();
  const { body } = req;
  try {
    const basic = await candidate_basic.create(
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

        academics: {
          course: body.course,
          board: body.board,
          year: body.pass,
          percentage: body.per,
        },
        expriences: {
          company_name: body.cname,
          designation: body.wdesig,
          start_date: body.sdate,
          end_date: body.edate,
        },
        languages: {
          language_name: body.hindi,
          reads: body.read || "NO",
          writes: body.write || "NO",
          speaks: body.speak || "NO",
        },
      },
      { transaction: t }
    );
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
  const basic = await candidate_basic.findAll();
  res.render("show", { basic });
};

module.exports = {
  BasicDetail,
  BasicForm,
  city,
  oneToMany,
  show,
  images,
  videos,
  tags,
  imageupdate,
  imagedelete,
  tagupdate,
  showtag,
  manydelete,
  manyupdate,
  manytomany,
  manyshow,
  updatemany,
};
