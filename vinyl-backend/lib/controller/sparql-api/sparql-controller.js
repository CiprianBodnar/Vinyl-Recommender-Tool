const router = require('express').Router();
const auth = require('../../service/auth');
const SPARQL = require('../../service/sparql_service')
const my_sparql = new SPARQL();
var request = require('request')
var myResultList = []
var mappedResultList = []
var mapOfBands = new Map()
const mongoose = require('mongoose');
const Question = mongoose.model('Questions')


function getOpt(search) {
    return  {
        url: 'http://localhost:8000/api/spotify/search',
        body: {
            'search': search,
            'type': 'artist'
        },
        json: true
    }
}

function getUser() {
    return  {
        url: 'http://localhost:8000/api/users/current',
        headers: {
            'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyX3VzZXJAZ21haWwuY29tIiwiaWQiOiI1ZTBkZjQ3NDdlMDk0NzMxOTAyMjkzZDMiLCJleHAiOjE1ODU0Nzg0MzAsImlhdCI6MTU4MDI5ODAzMH0.ChzymGKRHNxpBnauz470uPxE6_WFMrQRbb_r19RhWxs'
          },
        json: true
    }
}

router.get('/', auth.required, (req, res, next) => {
    var result = my_sparql.myQuery("","") 
    request.get(result, function(error, response, body) {
        var obj = JSON.parse(response.body)
        var listOfBindings = obj['results']['bindings']

       for(it in listOfBindings){
            mapOfBands[listOfBindings[it]['bandName']['value']] = listOfBindings[it]
            //spotifySearch(listOfBindings[it]['bandName']['value'])
        }
        Object.keys(mapOfBands).forEach(function(key) {
            value = mapOfBands[key];
            mappedResultList.push(value)
        });
        for(it in mappedResultList){
            
             spotifySearch(mappedResultList[it]['bandName']['value'])
         }
       return res.json(myResultList)
    });
});

function spotifySearch(param) {
    return  request.post(getOpt(param), function(error, response, body) {
        if(body!=null)
            myResultList.push(body)
        return body
    });
}



module.exports = router;