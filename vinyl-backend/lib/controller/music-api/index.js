const express = require('express');
const router = express.Router();

router.use('/music', require('./music-controller'));
module.exports = router;