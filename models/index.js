var mongoose = require('mongoose');
mongoose.connect( 'mongodb://localhost/EatRight' ||
                  process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL );


module.exports = {
  User: require('./user'),
  Food: require('./food')
}
