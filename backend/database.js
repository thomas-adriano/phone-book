const mongoose = require('mongoose');

module.exports = { connectMongoDB };

function connectMongoDB() {
  mongoose.connect(
    'mongodb://mongo:27017',
    {
      user: 'root',
      pass: 'example',
      dbName: 'phone-book',
      useNewUrlParser: true
    }
  );
}
