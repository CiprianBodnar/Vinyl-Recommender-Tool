const router = require('express').Router();
const auth = require('../../service/auth');
const SPARQL = require('../../service/sparql_service')
const my_sparql = new SPARQL();


router.get('/', auth.required, (req, res, next) => {
    return res.json((my_sparql.myQuery("",""))
    );
});

module.exports = router;