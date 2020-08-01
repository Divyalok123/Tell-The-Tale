const express = require('express');
const router = express.Router();
const passport = require('passport');
const postsApi = require('../../../controllers/api/v1/post_api');

router.get('/', postsApi.index);                        /* ↓ to not generate session cookie */ 
router.delete('/:id', passport.authenticate('jwt', {session: false}), postsApi.destroy);

module.exports = router;