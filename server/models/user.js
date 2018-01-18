const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const { auth } = require('./ldap');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: value => {
        if (value) validator.isEmail(value);
        return true;
      },
      message: '{VALUE} is not a valid Email'
    },
    default: null
  },
  username: {
    type: String,
    require: true,
    minlength: 6
  },
  password: {
    type: String,
    require: false,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
  role: {
    type: String,
    enum: ['user', 'admin-wt3d'],
    default: 'user'
  },
  type: {
    type: String,
    enum: ['ldap', 'ext'],
    default: 'ldap'
  }
});

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

  user.tokens.push({access, token});
  console.log(`generateAuthToken user :${JSON.stringify(user, null, 3)}`);

  return user.save().then(() => token);
};

UserSchema.methods.removeToken = function(token) {
  const user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};

UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function(username, password) {
  const User = this;

  return User.findOne({username}).then(user => {
    if (!user) {
      return Promise.reject();
    }
    if (user.type === 'ldap') {
      console.log('ldap case ');
      return auth(username, password)
        .then(ldapUser => {
          console.log('ldap user && pass are ok ');
          return Promise.resolve(user);
        }
        ).catch(e => {
          console.log('ldap user && pass are NOT Ok ');
          return Promise.reject(e);
        }
        );
    } else {
      return new Promise((resolve, reject) => {
        // Use bcrypt.compare to compare password and user.password
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user);
          } else {
            reject();
          }
        });
      });
    }
  });
};

UserSchema.pre('save', function(next) {
  const user = this;
  console.log(`pre save user :${JSON.stringify(user, null, 3)}`);
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = {User};
