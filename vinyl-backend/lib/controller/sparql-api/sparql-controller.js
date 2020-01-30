const router = require('express').Router();
const auth = require('../../service/auth');
const SPARQL = require('../../service/sparql_service')
const my_sparql = new SPARQL();
var request = require('request')
var myResultList = []

const mongoose = require('mongoose');
const Question = mongoose.model('Questions')
var resultOfRandom 

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

function getUser(authToken) {
    return  {
        url: 'http://localhost:8000/api/users/current',
        headers: {
            'Authorization': 'Token '+ authToken
          },
        json: true
    }
}



router.get('/', auth.required, (req, res, next) => {
    var userId = req.query.id

    Question.find({}, function( err , question){
        if(err){
            console.log("nothing found")
        }
        else{
            resultOfRandom = my_sparql.getRandomGenre(question, userId) 
            if(resultOfRandom == "Punk"){
                resultOfRandom = "Punk_rock"
            }
            var result = my_sparql.myQuery(resultOfRandom,"") 
            var mappedResultList = []
            var mapOfBands = new Map()
            request.get(result, function(error, response, body) {
                var obj = JSON.parse(response.body)
                var listOfBindings = obj['results']['bindings']
               for(it in listOfBindings){
                    mapOfBands[listOfBindings[it]['bandName']['value']] = listOfBindings[it]
                }
                Object.keys(mapOfBands).forEach(function(key) {
                    value = mapOfBands[key];
                    mappedResultList.push(value)
                });
                for(it in mappedResultList){
                     spotifySearch(mappedResultList[it]['bandName']['value'])
                 }
               return res.json(my_sparql.shuffleList(myResultList))
              // return res.json(myResultList)
            });
        
        }
    })
  
  
});

function spotifySearch(param) {
    return  request.post(getOpt(param), function(error, response, body) {
        if(body!=null || body!= undefined){
            myResultList.push(body)
        }
        return body
    });
}

module.exports = router;