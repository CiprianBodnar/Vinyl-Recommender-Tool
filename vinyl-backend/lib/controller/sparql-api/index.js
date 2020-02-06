const express = require('express');
const router = express.Router();

router.use('/sparql', require('./sparql-controller'));
router.use('/sparql', require('./sparql_controller2'));

module.exports = router;