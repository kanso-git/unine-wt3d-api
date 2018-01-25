const express = require('express');
const router = express.Router();

const bdl_controller = require('../controllers/bdlController');

/// USERS ROUTES ///

// GET request for user info
router.get('/buildings', bdl_controller.bdl_buildingList_get);

module.exports = router;
