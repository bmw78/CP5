var mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
  title: String,
  upvotes: {type: Number, default: 0},
  name: String
});

BookSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Book', BookSchema);
