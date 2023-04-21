var db = require("../models");
// console.log("models:", db);
var User = db.user;
const show = async (req, res) => {
  var page = req.query.page || 1;
  var endindex = 10;
  let sort = req.query.sort || "id";
  let typ = req.query.typ || "desc";
  if (typ == "desc") typ = "asc";
  else typ = "desc";
  var startindex = (page - 1) * endindex;
  const total = await User.count({
    where: { deletedAt: null },
    order: [[sort, typ]],
  });
  // const [data] = await db.sequelize.query(
  //   `SELECT * FROM users WHERE deletedAt IS NULL ORDER BY ${sort} ${typ} limit ${startindex}, ${endindex}`
  // );
  // console.log(data);
  const data = await User.findAll({
    where: { deletedAt: null },
    order: [[sort, typ]],
    limit: endindex,
    offset: startindex,
  });
  // console.log("data", data);
  res.render("show.ejs", {
    data,
    total,
    page,
    limit: endindex,
    startindex,
    sort,
    typ,
  });
};

module.exports = { show };
