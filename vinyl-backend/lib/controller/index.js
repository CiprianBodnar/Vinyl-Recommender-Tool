const express = require('express');
const router = express.Router();

router.use('/api', require('./user-api'));
router.use('/api', require('./question-api'));
module.exports = router;