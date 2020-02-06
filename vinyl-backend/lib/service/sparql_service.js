
var rdfstore = require('rdfstore');

class SPARQL_service {
    
myQuery(genre) {
    var DBP = "http://dbpedia.org/sparql";
    
    var query = [
    
        "SELECT ?members ?bandName where {",
            "?band dbo:genre dbr:"+genre+" .",
            "?band dbp:currentMembers ?members .",
            "?band foaf:name ?bandName",
            "FILTER(langMatches(lang(?bandName), \"en\"))",
           "}",
           "LIMIT 50",].join(" ")
         
    var queryURL = DBP + "?query=" + encodeURIComponent(query) + "&format=json" ;
    return queryURL;
    }

rdf() {
    rdfstore.create(function(err, store) {
        store.execute('LOAD <http://dbpedia.org/resource/Tim_Berners-Lee> INTO GRAPH <http://example.org/people>', function() {
      
          store.setPrefix('dbp', 'http://dbpedia.org/resource/');
      
          store.node(store.rdf.resolve('dbp:Tim_Berners-Lee'),  "http://example.org/people", function(err, graph) {
      
            var peopleGraph = graph.filter(store.rdf.filters.type(store.rdf.resolve("foaf:Person")));
      
            store.execute('PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                           PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
                           PREFIX : <http://example.org/>\
                           SELECT ?s FROM NAMED :people { GRAPH ?g { ?s rdf:type foaf:Person } }',
                           function(err, results) {
      
                             console.log(peopleGraph.toArray()[0].subject.valueOf() === results[0].s.value);
      
                           });
          });
      
        });
      });
    }
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    getRandomGenre(question, userId){
      for(var q in question){
        if(question[q].user_id == userId){
            if(question[q].question == "Genre"){
                var listOfGenre = question[q].answer
                var randomIndex = this.getRandomInt(listOfGenre.length)
                return listOfGenre[randomIndex]
            }  
        }
      }
    }

    shuffleList(array){
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }
      return array;
    }

    storeInMap(listOfSparqlJsons){
      var mapOfBands = new Map()
      for(var it in listOfSparqlJsons){
        mapOfBands[listOfSparqlJsons[it]['bandName']['value']] = listOfSparqlJsons[it]
      }
      return mapOfBands
    }

    removeDuplicates(mapOfBands){
      var mappedResultList = []
      Object.keys(mapOfBands).forEach(function(key) {
        var value = mapOfBands[key];
        mappedResultList.push(value)
      });
      return mappedResultList
    }

    getOpt(search) {
      return  {
          url: 'http://localhost:8000/api/spotify/search',
          body: {
              'search': search,
              'type': 'artist'
          },
          json: true
      }
  }

  getBody(search){
    return {
      'search': search,
      'type': 'artist'
    }
  }
};
module.exports = SPARQL_service
