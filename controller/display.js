var db = require("../models");
const { sequelize } = require("../models");
const { Op } = require("sequelize");
const { basic_detail } = require("../models");
const { designation } = require("../models");
const { state } = require("../models");
const { city } = require("../models");
const multer = require("multer");
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
  const t = await sequelize.transaction();
  try {
    const stateinsert = await state.bulkCreate(
      [
        {
          state_name: "Gujarat",
          cities: [
            { city_name: "Ahmedabad" },
            { city_name: "Vadodra" },
            { city_name: "Surat" },
            { city_name: "Valsad" },
            { city_name: "Rajkot" },
            { city_name: "Bhavnagar" },
          ],
        },
        {
          state_name: "Rajasthan",
          cities: [
            { city_name: "Jaipur" },
            { city_name: "Kota" },
            { city_name: "Sikar" },
            { city_name: "Ajmer" },
            { city_name: "Udaipur" },
            { city_name: "Bhilwara" },
          ],
        },
        {
          state_name: "Bihar",
          cities: [
            { city_name: "Patna" },
            { city_name: "Gaya" },
            { city_name: "Muzaffarpur" },
            { city_name: "Begusarai" },
            { city_name: "Purnia" },
            { city_name: "Buxar" },
          ],
        },
        {
          state_name: "Maharastra",
          cities: [
            { city_name: "Pune" },
            { city_name: "Nashik" },
            { city_name: "Mumbai" },
            { city_name: "Thane" },
            { city_name: "Nagpur" },
            { city_name: "Kolhapur" },
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
    const states = await state.findAll({});
    res.render("form", { states });
  } catch (err) {
    console.log(err);
  }
};

const fetch = async (req, res) => {
  try {
    let id = req.query.id;
    const cities = await city.findAll({
      where: { state_id: id },
    });
    res.json(cities);
  } catch (err) {
    console.log(err);
  }
};

const data = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    let { body, file } = req;
    const show = await basic_detail.create(
      {
        first_name: body.firstName,
        last_name: body.lastName,
        age: body.age,
        image: file.filename,
        contact_number: body.contact,
        full_address: body.address,
        city: body.city,
        email: body.email,
        dob: body.dateOfBirth,
        gender: body.gender,

        designations: {
          position: body.wdesig,
          company_name: body.cname,
          start_date: body.sdate,
          end_date: body.edate,
        },
      },
      { include: { all: true } },
      { transaction: t }
    );
    await t.commit();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    await t.rollback();
  }
};

const show = async (req, res) => {
  try {
    const display = await basic_detail.findAll({
      include: { all: true, reqired: true },
    });
    res.render("display", {
      display,
    });
  } catch (err) {
    console.log(err);
  }
};

const get_data = async (req, res) => {
  try {
    const basicDetail = ["first_name", "age", "image"];
    const descDetail = ["position", "company_name", "start_date"];
    let draw = req.query.draw;
    let search = req.query.search;
    let start = parseInt(req.query.start);
    let length = parseInt(req.query.length);
    let order_data = req.query.order;

    let column_index = req.query.order[0]["column"];
    let column_name = req.query.columns[column_index]["data"];
    let column_sort = req.query.order[0]["dir"];

    let tableName;
    if (basicDetail.indexOf(column_name) >= 0) {
      tableName = [sequelize.col(`basic_detail.${column_name}`), column_sort];
    } else if (descDetail.indexOf(column_name) >= 0) {
      tableName = [designation, column_name, column_sort];
    }

    // if (column_name.includes(".")) {
    //   let columnName = column_name.split(".");
    //   let table = columnName[0].slice(0, -2);
    // }
    // console.log(tableName);
    // return;
    const data = await basic_detail.count({
      include: [
        {
          model: designation,
          reqired: true,
          where: {
            [Op.or]: [
              {
                "$basic_detail.first_name$": {
                  [Op.like]: `%${search.value}%`,
                },
              },
              {
                "$basic_detail.age$": {
                  [Op.like]: `%${search.value}%`,
                },
              },
              {
                position: {
                  [Op.like]: `%${search.value}%`,
                },
              },
              {
                company_name: {
                  [Op.like]: `%${search.value}%`,
                },
              },
              {
                start_date: {
                  [Op.like]: `%${search.value}%`,
                },
              },
            ],
          },
        },
      ],
    });

    if (length == -1) {
      length = data;
    }

    const { rows, count } = await basic_detail.findAndCountAll({
      limit: length,
      offset: start,
      attributes: ["first_name", "age", "image"],
      order: [tableName],
      include: [
        {
          model: designation,
          reqired: true,
          attributes: ["position", "company_name", "start_date"],
          where: {
            [Op.or]: [
              {
                "$basic_detail.first_name$": {
                  [Op.like]: `%${search.value}%`,
                },
              },
              {
                "$basic_detail.age$": {
                  [Op.like]: `%${search.value}%`,
                },
              },
              {
                "$basic_detail.image$": {
                  [Op.like]: `%${search.value}%`,
                },
              },
              {
                position: {
                  [Op.like]: `%${search.value}%`,
                },
              },
              {
                company_name: {
                  [Op.like]: `%${search.value}%`,
                },
              },
              {
                start_date: {
                  [Op.like]: `%${search.value}%`,
                },
              },
            ],
          },
        },
      ],
    });

    // console.log(count);
    // return;
    let payload = {};
    payload.data = [];
    for (const data of rows) {
      let images;
      if (data.image != null) {
        images = `<img src="/image/${data.image}" alt="image" height= "100px" width="100px">`;
      } else {
        images = "";
      }
      payload.data.push({
        first_name: data.first_name,
        position: data.designations[0].position,
        company_name: data.designations[0].company_name,
        image: images,
        age: data.age,
        start_date: data.designations[0].start_date,
      });
    }
    res.json({
      ...payload,
      // data: datas,
      draw,
      start,
      recordsFiltered: count,
      recordsTotal: count,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  states,
  display,
  fetch,
  data,
  show,
  get_data,
  storage,
  upload,
};
