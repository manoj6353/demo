const multer = require("multer");
const { Op } = require("sequelize");
const { sequelize } = require("../models");
const db = require("../models");
const { repo } = require("../repository/demo");
const joi = require("joi");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/image");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const states = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const stateinsert = await db.state.bulkCreate(
      [
        {
          state_name: "Gujarat",
          cities: [
            { city_name: "Ahmedabad" },
            { city_name: "Vadodra" },
            { city_name: "Bhavnagar" },
          ],
        },
      ],
      { include: { all: true } },
      { transaction: t }
    );
    res.send(stateinsert);
    await t.commit();
  } catch (err) {
    console.log(err);
    await t.rollback();
  }
};

const display = async (req, res) => {
  try {
    const states = await repo.findallstate();
    res.render("form", { states });
  } catch (err) {
    res.send(res.status(400).err);
  }
};

const fetch = async (req, res) => {
  try {
    const id = req.query.id;
    const cities = await repo.findonestate(id);
    res.json(cities);
  } catch (err) {
    res.send(res.status(400).err);
  }
};

const data = async (req, res) => {
  try {
    let { body, file } = req;

    const data = await repo.insert(body, file);
    if (data.error) {
      res.json(data.error.details);
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

const dataupdate = async (req, res) => {
  try {
    let { body, file } = req;
    const data = await repo.update(body, file);
    if (data.error) {
      res.json(data.error.details);
    } else {
      res.redirect("/");
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const show = async (req, res) => {
  try {
    const display = await repo.findall();
    res.render("display", {
      display,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getdata = async (req, res) => {
  try {
    const { query } = req;
    const { data, draw, start, recordsFiltered, recordsTotal } =
      await repo.datatable(query);
    res.json({ data, draw, start, recordsFiltered, recordsTotal });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const deletedata = async (req, res) => {
  const { id } = req.body;
  try {
    await repo.deletbasicdetails(id);
    await repo.deletedesignations(id);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const restore = async (req, res) => {
  const { id } = req.body;
  try {
    await repo.restorebasicdetails(id);
    await repo.restoredesignations(id);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const trash = async (req, res) => {
  try {
    const isAjax = req.xhr;
    const rows = repo.findalldeleted();
    if (isAjax) {
      const { query } = req;
      const { data, draw, start, recordsFiltered, recordsTotal } =
        await repo.deleteddata(query);
      res.json({ data, draw, start, recordsFiltered, recordsTotal });
    } else {
      res.render("trash", {
        display: rows,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const update = async (req, res) => {
  const { id } = req.query;
  try {
    const states = await repo.findallstate();
    const data = await repo.findonebasicdetails(id);
    res.render("updateform", { data, states });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  states,
  update,
  display,
  fetch,
  data,
  trash,
  show,
  getdata,
  deletedata,
  restore,
  dataupdate,
  storage,
  upload,
};
