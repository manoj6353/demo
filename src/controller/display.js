const { Op } = require("sequelize");
const db = require("../models");

const multer = require("multer");
const { sequelize } = require("../models");

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
    const states = await db.state.findAll({});
    res.render("form", { states });
  } catch (err) {
    console.log(err);
  }
};

const fetch = async (req, res) => {
  try {
    let id = req.query.id;
    const cities = await db.city.findAll({
      where: { state_id: id },
    });
    res.json(cities);
  } catch (err) {
    console.log(err);
  }
};

const data = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    let { body, file } = req;
    const show = await db.basic_detail.create(
      {
        first_name: body.firstName,
        last_name: body.lastName,
        age: body.age,
        image: file.filename,
        contact_number: body.contact,
        full_address: body.address,
        state: body.state,
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

const dataupdate = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    let { body, file } = req;
    const show = await db.basic_detail.update(
      {
        first_name: body.firstName,
        last_name: body.lastName,
        age: body.age,
        image: file ? file.filename : null,
        contact_number: body.contact,
        full_address: body.address,
        state: body.state,
        city: body.city,
        email: body.email,
        dob: body.dateOfBirth,
        gender: body.gender,
      },
      { where: { id: body.basicId } }
    );
    const designation = db.designation.update(
      {
        position: body.wdesig,
        company_name: body.cname,
        start_date: body.sdate,
        end_date: body.edate,
      },
      { where: { basic_id: body.basicId } },
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
    const display = await db.basic_detail.findAll({
      include: { all: true, reqired: true },
    });
    res.render("display", {
      display,
    });
  } catch (err) {
    console.log(err);
  }
};

const getdata = async (req, res) => {
  try {
    const { query } = req;
    const basicDetail = ["first_name", "age", "image", "id"];
    const descDetail = ["position", "company_name", "start_date"];
    let draw = query.draw;
    let search = query.search;
    let start = parseInt(query.start);
    let length = parseInt(query.length);

    let column_index = query.order[0]["column"];
    let column_name = query.columns[column_index]["data"];
    let column_sort = query.order[0]["dir"];

    let tableName;
    if (basicDetail.indexOf(column_name) >= 0) {
      tableName = [
        db.sequelize.col(`basic_detail.${column_name}`),
        column_sort,
      ];
    } else if (descDetail.indexOf(column_name) >= 0) {
      tableName = [db.designation, column_name, column_sort];
    }

    // if (column_name.includes(".")) {
    //   let columnName = column_name.split(".");
    //   let table = columnName[0].slice(0, -2);
    // }
    // console.log(tableName);
    // return;
    const { rows, count } = await db.basic_detail.findAndCountAll({
      limit: length,
      offset: start,
      attributes: ["first_name", "age", "image", "id"],
      order: [tableName],
      include: [
        {
          model: db.designation,
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
    let payload = {};
    payload.data = [];
    for (const data of rows) {
      let images;
      let del = `<a onclick="view(${data.id})" id="delete">Delete</a> 
      <a href="/update/?id=${data.id}" id="update">Update</a>`;
      // <a onclick="update(${data.id})" id="update">Update</a>`;
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
        action: del,
        start_date: data.designations[0].start_date,
      });
    }
    res.json({
      ...payload,
      draw,
      start,
      recordsFiltered: count,
      recordsTotal: count,
    });
  } catch (err) {
    console.log(err);
  }
};

const deletedata = async (req, res) => {
  const { id } = req.body;
  const t = await sequelize.transaction();
  try {
    const basic = await db.basic_detail.destroy(
      {
        where: { id: id },
      },
      { transaction: t }
    );
    const designation = await db.designation.destroy(
      {
        where: { basic_id: id },
      },
      { transaction: t }
    );
    await t.commit();
  } catch (err) {
    console.log(err);
    await t.rollback();
  }
};

const restore = async (req, res) => {
  const { id } = req.body;
  const t = await sequelize.transaction();
  try {
    const basic = await db.basic_detail.restore(
      {
        where: { id: id },
      },
      { transaction: t }
    );
    const designation = await db.designation.restore(
      {
        where: { basic_id: id },
      },
      { transaction: t }
    );
    await t.commit();
  } catch (err) {
    console.log(err);
    await t.rollback();
  }
};

const trash = async (req, res) => {
  try {
    const isAjax = req.xhr;
    const { rows } = await db.basic_detail.findAndCountAll({
      attributes: ["first_name", "age", "image", "id"],
      include: [
        {
          model: db.designation,
          required: true,
          attributes: ["position", "company_name", "start_date"],
          paranoid: false,
          where: { deletedAt: { [Op.ne]: null } },
        },
      ],
      paranoid: false,
    });
    if (isAjax) {
      const { query } = req;
      const basicDetail = ["first_name", "age", "image", "id"];
      const descDetail = ["position", "company_name", "start_date"];
      let draw = query.draw;
      let search = query.search;
      let start = parseInt(query.start);
      let length = parseInt(query.length);

      let column_index = query.order[0]["column"];
      let column_name = query.columns[column_index]["data"];
      let column_sort = query.order[0]["dir"];

      let tableName;
      if (basicDetail.indexOf(column_name) >= 0) {
        tableName = [
          db.sequelize.col(`basic_detail.${column_name}`),
          column_sort,
        ];
      } else if (descDetail.indexOf(column_name) >= 0) {
        tableName = [db.designation, column_name, column_sort];
      }
      const { rows, count } = await db.basic_detail.findAndCountAll({
        limit: length,
        offset: start,
        attributes: ["first_name", "age", "image", "id"],
        order: [tableName],
        // where: { deletedAt: { [Op.ne]: null } },
        include: [
          {
            model: db.designation,
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
              deletedAt: { [Op.ne]: null },
            },
            paranoid: false,
          },
        ],
        paranoid: false,
      });
      let payload = {};
      payload.data = [];
      for (const data of rows) {
        let images;
        let del = `<a onclick="view(${data.id})" id="delete">Restore</a> 
      <a onclick="update(${data.id})" id="update">Update</a>`;
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
          action: del,
          start_date: data.designations[0].start_date,
        });
      }
      res.json({
        ...payload,
        draw,
        start,
        recordsFiltered: count,
        recordsTotal: count,
      });
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
    const states = await db.state.findAll({});
    const data = await db.basic_detail.findOne({
      where: { id: id },
      include: [{ model: db.designation }],
    });
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
