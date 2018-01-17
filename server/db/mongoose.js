const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const myUri = process.env.MONGODB_URI;
mongoose.connect(myUri, {
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30
  });

module.exports = { mongoose };