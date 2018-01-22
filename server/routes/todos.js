const express = require('express');
const router = express.Router();

const {authenticate} = require('../middleware/authenticate');
const todo_controller = require('../controllers/todoController');


/// TODOS ROUTES ///

// GET request for list of all todos.
router.get('/', authenticate, todo_controller.todo_list);

// GET request for todo by id
router.get('/:id', authenticate, todo_controller.todo_get);

// DEL request delete todo by id
router.delete('/:id', authenticate, todo_controller.todo_delete);

// POST request to create new todo
router.post('/', authenticate, todo_controller.todo_add_post);

// GET request for todo update.
router.patch('/:id', authenticate, todo_controller.todo_update_patch);

module.exports = router;
