var db = require("../models");
const { sequelize } = require("../models");
const { basic_detail } = require("../models");
const { designation } = require("../models");
const { state } = require("../models");
const { city } = require("../models");

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
    let { body } = req;
    console.log(JSON.stringify(body));

    const show = await basic_detail.create(
      {
        first_name: body.firstName,
        last_name: body.lastName,
        age: body.age,
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
    let start = req.query.start || 1;
    let length = req.query.length || 5;
    let order_data = req.query.order;

    if (typeof order_data == "undefined") {
      let column_name = "basic_details.first_name";
      let sort_order = "asc";
    } else {
      let column_index = req.query.order[0]["column"];
      let column_name = req.query.columns[column_index]["data"];
      let column_sort = req.query.order[0]["dir"];
    }
    const display = await basic_detail.findAll({
      include: { all: true, reqired: true },
    });
    console.log({ recordTotal: 10, data: display });
    res.render("display", {
      display,
    });
  } catch (err) {
    console.log(err);
  }
};

const get_data = async (req, res) => {
  try {
    let column_name, column_sort;
    let start = parseInt(req.query.start) || 1;
    let length = parseInt(req.query.length) || 5;
    let order_data = req.query.order;

    if (typeof order_data == "undefined") {
      let column_name = "basic_details.first_name";
      let sort_order = "asc";
    } else {
      console.log("===========================================asdfjhasjkagjhs");
      let column_index = req.query.order[0]["column"];
      column_name = req.query.columns[column_index]["data"];
      column_sort = req.query.order[0]["dir"];
    }
    console.log("=========", column_name);
    const datas = await basic_detail.findAll({
      limit: length,
      offset: start - 1,
      order: [[column_name, column_sort]],
      include: { all: true, reqired: true },
    });
    let payload = {};
    payload.data = [];
    for (const data of datas) {
      payload.data.push({
        first_name: data.first_name,
        position: data.designations[0].position,
        company_name: data.designations[0].company_name,
        age: data.age,
        start_date: data.designations[0].start_date,
      });
    }
    res.json({ ...payload, recordTotal: 10 });
  } catch (err) {
    console.log("skjhdgfsjhdfhjgsjhfgsjdfgjhkdg", err);
    return {};
  }
};

module.exports = { states, display, fetch, data, show, get_data };
