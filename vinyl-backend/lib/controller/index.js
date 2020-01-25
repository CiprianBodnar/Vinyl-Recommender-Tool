const express = require('express');
const router = express.Router();

router.use('/api', require('./user-api'));
router.use('/api', require('./question-api'));
router.use('/api', require('./music-api'));
router.use('/api', require('./search-api'));
router.use('/api', require('./social-api'));
router.use('/api', require('./sparql-api'));

module.exports = router;