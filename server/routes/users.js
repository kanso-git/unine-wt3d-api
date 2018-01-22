const express = require('express');
const router = express.Router();

const {authenticate} = require('../middleware/authenticate');
const user_controller = require('../controllers/userController');

/// USERS ROUTES ///

// GET request for user info
router.get('/me', authenticate, user_controller.user_info_get);

// POST request for list from AD by query
router.post('/searchUsersAD', authenticate, user_controller.user_list_ad_post);

// POST request for user from AD by query
router.post('/searchUserAD', authenticate, user_controller.user_user_ad_post);

// GET request for list of all users.
router.get('/', authenticate, user_controller.user_list_get);

// POST request to create new user
// router.post('/', authenticate, user_controller.user_add_post);
router.post('/', user_controller.user_add_post);

// POST request to login user
router.post('/login', user_controller.user_login_post);

// DEL request to logout user
router.delete('/me/token', authenticate, user_controller.user_logout_post);

module.exports = router;
