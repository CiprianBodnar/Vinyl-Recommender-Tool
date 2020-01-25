const router = require('express').Router();
const auth = require('../../service/auth');
const SPARQL = require('../../service/sparql_service')
const my_sparql = new SPARQL();
var request = require('request')

router.get('/', auth.required, (req, res, next) => {
    var result = my_sparql.myQuery("dani","moca") 
    
    var returnObj = request.get(result, function(error, response, body) {
        var obj = JSON.parse(response.body)
        var listOfBindings = obj['results']['bindings']
        for(it in listOfBindings){
            console.log(listOfBindings[it]['bandName']['value'] + "--" + listOfBindings[it]['members']['value'])
        }
        return listOfBindings
     
    });
    return res.json((returnObj)
    );
});

module.exports = router;