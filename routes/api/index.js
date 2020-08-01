/* Apis will have their own index.js files for api files and similarly for their versions*/

const express = require('express');
const router = express.Router();

router.use('/v1', require('./v1'));
router.use('/v2', require('./v2'));

module.exports = router;