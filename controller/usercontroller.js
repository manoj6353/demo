var db = require('../models');
var User = db.user;
console.log(db.user);
var adduser = async (req,res) => {
    const manoj = await User.create({firstName : 'manoj', lastName :'bajiya', email : 'manoj@gmail.com'});
    // const manoj = user.build({firstName : 'manoj', lastName : 'bajiya'});
    // await manoj.save();
    res.status(200).json(manoj.toJSON());
}
module.exports ={adduser}