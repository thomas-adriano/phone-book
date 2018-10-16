const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const auth = require('./auth');
const database = require('./database');
const statusRoute = require('./routes/status');
const loginRoute = require('./routes/login');
const contactsRoute = require('./routes/contacts');
const SERVER_PORT = process.env.SERVER_PORT || 4455;

app.use(bodyParser.json());
app.use(cors());
auth.setUpJWT();
database.connectMongoDB();
database.createDefaultUsers();

app.use('/', statusRoute);
app.use('/', loginRoute);
app.use('/', contactsRoute);

app.listen(SERVER_PORT, function() {
  console.log(
    `Web server listening on host ${os.hostname} port ${SERVER_PORT}`
  );
});
