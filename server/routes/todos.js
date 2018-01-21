const express = require('express');
const router = express.Router();

const {authenticate} = require('../middleware/authenticate');
const todo_controller = require('../controllers/todoController');


/// TODOS ROUTES ///

// GET request for list of all todos.
router.get('/', authenticate, todo_controller.todo_list);


module.exports = router;
