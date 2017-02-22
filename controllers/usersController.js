var auth = require('../middleware/auth');
var db = require('../models'),
    User = db.User;
    Meal = db.Meal;

function login(req, res) {
  User.findOne({ email: req.body.email }, '+password', function (err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid email or password.' });
      }
      res.send({ token: auth.createJWT(user) }); //send back token for that user
    });
  });
}

function signup(req, res) {
  User.findOne({ email: req.body.email }, function (err, existingUser) {
    if (existingUser) {
      return res.status(409).send({ message: 'Email is already taken.' });
    }
    var user = new User({
      displayName: req.body.displayName,
      email: req.body.email,
      password: req.body.password,
      created: new Date()
    });
    user.save(function (err, result) {
      if (err) {
        res.status(500).send({ message: err.message });
      }
      res.send({ token: auth.createJWT(result) });
    });
  });
}

function updateCurrentUser(req, res) {
  User.findById(req.user_id, function (err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found.' });
    }
    user.displayName = req.body.displayName || user.displayName;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.save(function(err, result) {
      res.send({ token: auth.createJWT(result) });
    });
  });
}

function showCurrentUser (req, res) {
  User.findById(req.user_id, function (err, user) {
      console.log(user)
    res.send(user);

    // res.send(user.populate('posts'));
  });
}

function showUserProfile (req, res) {
  User.findById(req.user_id, function(err, foundUser) {
    res.send(foundUser);
  })
  .populate({
      path: 'meals',
      populate: {path: 'foods'}
    });
}

function addMeal (req, res) {

  Meal
    .find({user:req.user_id}) //finding all meals by user id
    .populate('users')
    .populate('foods')
    .exec (function (err, foundUserMeal) {
      console.log("---------------", foundUserMeal)
      //if user meal exists...
      if (foundUserMeal.length>0) {
        //check to see if last meal for current date
        if ( foundUserMeal[foundUserMeal.length-1].date.valueOf() === new Date().setHours(0,0,0,0) ) {
          console.log("todays meal already exists for user");
        } else {
          //if not, then add new Meal for current date
          var add_meal = new Meal({
            date: new Date().setHours(0,0,0,0),
            user: req.user_id,
            total: 0,
            foods:[]
          });

          add_meal.save(function (err, add_meal) {
            console.log("new meal added to meal db")
          });

          User
            .findById(req.user_id)
            .populate('meals')
            .exec(function (err, foundUser) {
              foundUser.meals.push(add_meal);
              foundUser.save();
              console.log("meal added to user.meals array", foundUser);
            });
          }
      } else {
        //...if not, then create new meal for user for current date
        var add_usermeal = new Meal({
          date: new Date().setHours(0,0,0,0),
          user: req.user_id,
          total: 0,
          foods:[]
        });

        add_usermeal.save(function (err, add_usermeal) {
        });

        //saving meal to User.meals array
        User
          .findById(req.user_id)
          .populate('meals')
          .exec(function (err, foundUser) {
            console.log("addmean", foundUser);
            foundUser.meals.push(add_usermeal);
            foundUser.save();
          });
      }
    });
  }

module.exports = {
  signup: signup,
  login: login,
  updateCurrentUser: updateCurrentUser,
  showCurrentUser: showCurrentUser,
  showUserProfile: showUserProfile,
  addMeal: addMeal
};
