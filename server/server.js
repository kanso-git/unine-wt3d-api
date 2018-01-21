require('./config/config');
require('./db/mongoose');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {ObjectID} = require('mongodb');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');
const todos = require('./routes/todos');
const app = express();


app.use(cors());
const port = process.env.PORT;

app.use(bodyParser.json());

app.use('/todos', todos);


// POST /users
app.post('/users', async(req, res) => {
  try {
    console.log(`user to be saved   ${JSON.stringify(req.body, null, 3)} `);
    const body = _.pick(req.body, ['username', 'password']);
    const type = body.password ? 'ext' : 'ldap';
    body.type = type;
    console.log(`user to be saved   ${JSON.stringify(body, null, 3)} `);
    const user = new User(body);
    await user.save();
    //const token = await user.generateAuthToken();
    //res.header('x-auth', token).send(user);
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', async(req, res) => {
  try {
    const body = _.pick(req.body, ['username', 'password']);
    const user = await User.findByCredentials(body.username, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send();
  }
});


app.delete('/users/me/token', authenticate, async(req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
