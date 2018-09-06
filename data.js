var mongoose= require('mongoose');

mongoose.connect('mongodb://diade:diade@ds217360.mlab.com:17360/twitterclone');

var exerSchema= mongoose.Schema({
  username: String,
  id: Number,
  exercise: Array
});
exports.data1= mongoose.model('data', exerSchema);
