const express = require('express');
const router = express.Router();
const hommeController = require('../controllers/home_controller');
router.get('/', hommeController.home);
router.get('/project', require('../controllers/home_controller').project);

module.exports = router;