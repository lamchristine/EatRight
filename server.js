// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    auth = require('./middleware/auth'),
    controllers = require("./controllers");
    http = require('http').Server(app);
    request = require('request');

// require and load dotenv
require('dotenv').load();

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public')); //uses middleware 'static'?

// log api requests
app.use(logger('dev'));



/*
 * Auth Routes
 */

var usersCtrl = controllers.users;
app.post('/auth/signup', usersCtrl.signup);
app.post('/auth/login', usersCtrl.login);
app.get('/api/me', auth.ensureAuthenticated, usersCtrl.showCurrentUser); //auth.ensureAuthenticated checks to see if you are who you are, if so, then go to usersCtrl.showCurrentUser
app.put('/api/me', auth.ensureAuthenticated, usersCtrl.updateCurrentUser);
app.get('/api/users/:id', auth.ensureAuthenticated, usersCtrl.showUserProfile); //auth.ensureAuthenticated checks to see if you are who you are, if so, then go to usersCtrl.showCurrentUser
app.post('/api/users/:id/meals', auth.ensureAuthenticated, usersCtrl.addMeal); //auth.ensureAuthenticated checks to see if you are who you are, if so, then go to usersCtrl.showCurrentUser

/*
 * API Routes
 */

var foodsCtrl = controllers.foods;
app.post('/api/foods', auth.ensureAuthenticated, foodsCtrl.create);

/*
 * NutritionixAPI Routes
 */

app.post('/', auth.ensureAuthenticated, function (req, res) {
  console.log("post data", req.body);
  request('https://api.nutritionix.com/v1_1/search/' + req.body.item + '?results=0:20&fields=item_name,brand_name,item_id,images_front_full_url,nf_calories,nf_monounsaturated_fat,nf_polyunsaturated_fat,nf_sodium,nf_cholesterol,nf_saturated_fat,nf_serving_size_qty,nf_serving_size_unit,nf_serving_weight_grams,nf_calories_from_fat,nf_total_fat&appId=285dc9c7&appKey=ecd9dbdbeb3528353f71335e422e8653',
  function (error, response, body) {
    if(error){console.log(error);}
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});


/*
 * Catch All Route
 */
app.get(['/', '/signup', '/login', '/logout','/profile', '/foods*', '/users*', '/search*'], function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



/*
 * Listen on localhost:9000
 */
var port = process.env.PORT || 9000;
app.listen(port, function() {
  console.log('server started on port ', port);
});
