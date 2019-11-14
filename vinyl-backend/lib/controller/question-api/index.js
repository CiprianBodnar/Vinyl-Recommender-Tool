const express = require('express');
const router = express.Router();

router.use('/question', require('./questions-controller'));
module.exports = router;