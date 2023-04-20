var db = require("../models");
var User = db.user;
const delid = parseInt(req.params.id);
const del = async (req,res) =>{
  const data = await User.destroy({ where : { id : delid}});
  res.json({data})
}

module.exports = { del };