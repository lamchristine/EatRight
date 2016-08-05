var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var foodSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  content: String
});

var Food = mongoose.model('Food', foodSchema);
module.exports = Food;
