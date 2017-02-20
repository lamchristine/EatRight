var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var foodSchema = new Schema({
  created: {type: Date, default: Date.now},
  type: String, 
  item_name: String,
  brand_name: String,
  serving_size_qty: Number,
  serving_size_unit: String,
  serving_weight_grams: Number,
  calories: Number,
  calories_from_fat: Number,
  sat_fat: Number,
  carb: Number,
  fiber: Number,
  protein: Number,
  mono_fat: Number,
  poly_fat: Number,
  trans_fat: Number,
  total_fat: Number
});

var Food = mongoose.model('Food', foodSchema);
module.exports = Food;
