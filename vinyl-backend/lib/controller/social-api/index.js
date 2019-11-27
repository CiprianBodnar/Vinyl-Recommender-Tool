const express = require('express');
const router = express.Router();

router.use('/social', require('./social-controller'));
module.exports = router;