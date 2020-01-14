const express = require('express');
const router = express.Router();

router.use('/users', require('./user-controller'));
router.use('/spotify', require('./spotify-controller'));
module.exports = router;