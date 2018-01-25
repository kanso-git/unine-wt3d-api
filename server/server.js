require('./config/config');
require('./db/mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todos = require('./routes/todos');
const users = require('./routes/users');
const wt3d = require('./routes/wt3d');
const bdl = require('./routes/bdl');
const app = express();


app.use(cors());
const port = process.env.PORT;
app.use(bodyParser.json());

app.use('/api/todos', todos);
app.use('/api/users', users);
app.use('/api/bdl', bdl);
app.use('/api/wt3d', wt3d);

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
