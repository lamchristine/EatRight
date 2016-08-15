var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var mealSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  date: {type: Date},
  foods: [ {type: Schema.Types.ObjectId, ref: 'Food'} ],
  total: Number
});


var Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;
