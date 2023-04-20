var db = require("../models");
var User = db.user;
const show = async (req,res) =>{
  const data = await User.findAll();
  res.json({data})
}

module.exports = { show };