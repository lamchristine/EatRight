var auth = require('../middleware/auth');
var db = require('../models'),
    User = db.User,
    Food = db.Food,
    Meal = db.Meal;

function create(req, res) {
  var add_food = new Food(req.body);
  console.log("add_food", add_food);
  add_food.user = req.user_id;
  add_food.save(function(err, add_food){
    res.send(add_food);
  });

  Meal
    .find({user:req.user_id}) //finding all meals by user id
    .populate('users')
    .populate('foods')
    .exec (function (err, foundUserMeal) {
      //looping through all meals
      for (var i = 0; i <foundUserMeal.length;i++) {
        //finding the today's meal
        if ( foundUserMeal[i].date.valueOf() === new Date().setHours(0,0,0,0) ) {
          foundUserMeal[i].foods.push(add_food);

          // total calories per meal
          var total = 0;
            for (var j=0; j<foundUserMeal[i].foods.length; j++) {
              total+=foundUserMeal[i].foods[j].calories;
            }
            foundUserMeal[i].total = total;
            foundUserMeal[i].save( function(err, saved_meal){
              console.log("!!!!!!", saved_meal);
            });
        }
      }
    });
}


module.exports = {
  create: create
};
