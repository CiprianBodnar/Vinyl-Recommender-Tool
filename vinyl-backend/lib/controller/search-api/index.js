const express = require('express');
const router = express.Router();

router.use('/search', require('./search-controller'));
module.exports = router;