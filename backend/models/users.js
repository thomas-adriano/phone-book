const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user: String,
  password: Number
});

userSchema.statics.findByCode = function(code, cb) {
  return this.model('users').find({ password: code }, cb);
};

module.exports = mongoose.model('users', userSchema);
