const {Todo} = require('../models/todo');
const {authenticate} = require('../middleware/authenticate');


// Display list of all Authors.
exports.todo_list = async(req, res) => {
    try {
        const todos = await Todo.find({_creator: req.user._id});
        res.send({todos});
      } catch (e) {
          debugger;
        res.status(400).send(e);
      } 
};
