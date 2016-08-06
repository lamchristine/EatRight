var auth = require('../middleware/auth');
var db = require('../models'),
    User = db.User,
    Food = db.Food;

function create(req, res) {
  console.log('req', req.body);
  console.log('user', req.user_id);
  var add_food = new Food(req.body);
  add_food.user = req.user_id;
  add_food.save(function(err, add_food){
    res.send(add_food);
  });

  User
    .findById(req.user_id)
    .populate('foods')
    .exec(function (err, foundUser) {
      foundUser.foods.push(add_food);
      foundUser.save();
    });
}

module.exports = {
  create: create
};
