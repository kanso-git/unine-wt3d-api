require('./config/config');
require('./db/mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todos = require('./routes/todos');
const users = require('./routes/users');
const app = express();


app.use(cors());
const port = process.env.PORT;
app.use(bodyParser.json());

app.use('/todos', todos);
app.use('/users', users);

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
