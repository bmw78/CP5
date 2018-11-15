var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

/*UserSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};*/
mongoose.model('User', UserSchema);