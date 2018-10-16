const mongoose = require('mongoose');
const USERS = require('./models/users');

module.exports = { connectMongoDB, createDefaultUsers };

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

function createDefaultUsers() {

  USERS.findByCode(123, (err, user) => {
    if (!user || !user.length) {
      const user1 = new USERS({user: 'user1', password: 123});
      user1.save();
    }
  });

  USERS.findByCode(456, (err, user) => {
    if (!user || !user.length) {
      const user2 = new USERS({user: 'user1', password: 456});
      user2.save();
    }
  });

}
