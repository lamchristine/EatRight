var auth = require('../middleware/auth');
var db = require('../models'),
    User = db.User,
    Food = db.Food;

function index(req, res) {
  Food
    .find({})
    .populate('user')
    .exec(function(err, foods){
      if (err || !foods || !foods.length) {
        return res.status(404).send({message: 'Foods not found.'})
      }
      res.send(foods);
    })
}

module.exports = {
  index: index
};
