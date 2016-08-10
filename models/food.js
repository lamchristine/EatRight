var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var foodSchema = new Schema({
  created: {type: Date, default: Date.now},
  item_name: String,
  brand_name: String,
  calories: Number,
  fat: Number
});

var Food = mongoose.model('Food', foodSchema);
module.exports = Food;
