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
            'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxNl91c2VyQGdtYWlsLmNvbSIsImlkIjoiNWUxMWI3NzBiZmE3YmE1N2Q0ZmI3ZTExIiwiZXhwIjoxNTg1NTA0MTExLCJpYXQiOjE1ODAzMjM3MTF9.KHzNoDMei19lykiVBBkLiGfGVa32BAUCuir2yWrNsE0'
          },
        json: true
    }
}

router.get('/', auth.required, (req, res, next) => {
    //console.log("Da"+ res[0])
    var result = my_sparql.myQuery("","") 
    //get_user_preference()
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



function get_user_preference() {
    request.get(getUser(),  function(error, response, body){
        const User = body.user

        Question.find({}, function( err , question){
            if(err){
                console.log("nothing found")
            }
            else{
               // console.log(User._id)
                for(q in question){
                    if(question[q].user_id == User._id){
                        if(question[q].question == "Genre"){
                            var listOfGenre = question[q].answer
                            var randomIndex = my_sparql.getRandomInt(listOfGenre.length)
                            //console.log(listOfGenre[randomIndex])
                            return listOfGenre[randomIndex]
                        }
                            
                            
                    }
                }
            }
        })
    });
    
}

module.exports = router;