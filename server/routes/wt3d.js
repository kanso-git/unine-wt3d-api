const express = require('express');
const router = express.Router();

const {authenticate} = require('../middleware/authenticate');
const wt3d_controller = require('../controllers/wt3dController');


/// TODOS ROUTES ///

// GET request for list of all todos.
router.get('/populate', wt3d_controller.populate_localType_data);

module.exports = router;
