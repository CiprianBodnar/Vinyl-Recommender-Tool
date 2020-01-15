const express = require('express');
const router = express.Router();

router.use('/sparql', require('./sparql-controller'));
module.exports = router;