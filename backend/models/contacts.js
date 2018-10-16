const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  company: String,
  role: String,
  userId: String
});

module.exports = mongoose.model('contacts', contactSchema);
