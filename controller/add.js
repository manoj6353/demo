var db = require("../models");
const { Op } = require("sequelize");
var User = db.student;
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
    const display = await User.findAll({
      where: {
        id: {
          [Op.or]: [{ id: 2 }, { firstName: "manoj" }],
        },
      },
      // attributes: { include: ["firstName"] },
      // [db.Sequelize.fn("COUNT", db.Sequelize.col("id")), "count"],
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
};
