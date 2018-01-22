const _ = require('lodash');
const {User} = require('../models/user');

// GET request for list of all users.
exports.user_list_get = async(req, res) => {
  try {
    const users = await User.find({});
    res.send({users});
  } catch (e) {
    res.status(400).send(e);
  }
};

// POST request for list users from AD
exports.user_list_ad_post = async(req, res) => {
  const body = _.pick(req.body, ['query', 'match']);
  try {
    const users = await User.searchUsersInAD(body.query, body.match);
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
};

// POST request for  user from AD
exports.user_user_ad_post = async(req, res) => {
  const body = _.pick(req.body, ['query']);
  try {
    const user = await User.searchUserInAD(body.query);
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

// GET request for user info.
exports.user_info_get = async(req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
};

// POST request to create new user
exports.user_add_post = async(req, res) => {
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
};

// POST request to login user
exports.user_login_post = async(req, res) => {
  try {
    const body = _.pick(req.body, ['username', 'password']);
    const user = await User.findByCredentials(body.username, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send();
  }
};


// DEL request to logout user
exports.user_logout_post = async(req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
};
