/* Apis will have their own index.js files for api files and similarly for their versions*/
const express = require('express');
const router = express.Router();

router.use('/posts', require('./posts'));
router.use('/users', require('./users'));

module.exports = router;