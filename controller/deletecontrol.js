var db = require("../models");
var User = db.user;
const del = async (req, res) => {
  const delid = parseInt(req.params.id);
  const deldata = await User.destroy({ where: { id: delid } });
  const data = await User.findAll({ where: { deletedAt : null}});
  res.render("/show", { data });
};

module.exports = { del };
