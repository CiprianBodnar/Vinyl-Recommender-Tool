
var rdfstore = require('rdfstore');

class SPARQL_service {

wikidata(){
  var DBP = "https://query.wikidata.org/";

  var query = [
    "SELECT * WHERE {",
      "?song rdfs:label ?label ;",
            "wdt:P31    ?instance ;",
            "wdt:P175   ?artist .",
    
      "OPTIONAL { ?song wdt:P1651  ?youtubeId }",
      
      "FILTER (?artist = wd:Q15862)",
      "FILTER (?instance IN (wd:Q2031291, wd:Q2188189, wd:Q7302866, wd:Q134556, wd:Q7366, wd:Q169930))",
      "FILTER (?instance NOT IN (wd:Q482994))",
      "FILTER (lang(?label) = 'en')",
    "} LIMIT 10"
  ].join(" ")
  var queryURL = DBP + "?query=" + encodeURIComponent(query) + "&format=json" ;
  return queryURL;
}  

myArtistDetails(artist){
  
  var DBP = "http://dbpedia.org/sparql";


  var query = [
    "SELECT ?type ?wikidataArtist  ?artistName ?artistFirstName",
    "?artistLastName ?artistBirthName ?artistGender ?artistBirthPlace ?bandHomeTown ?artistActivityStartYear ?artistActivityEndYear WHERE {",
      "?dbpediaArtist rdf:type                 ?type ;",
                     "rdfs:label               ?artistName ;",
                     "dbo:abstract             ?aboutArtist .",
    
      "OPTIONAL { ?dbpediaArtist dbo:hometown             ?bandHomeTown            }    ",        
      "OPTIONAL { ?dbpediaArtist dbo:birthPlace           ?artistBirthPlace        }      ",        
      "OPTIONAL { ?dbpediaArtist dbo:activeYearsStartYear ?artistActivityStartYear }",
      "OPTIONAL { ?dbpediaArtist dbo:activeYearsEndYear   ?artistActivityEndYear   }",
      "OPTIONAL { ?dbpediaArtist dbo:birthName            ?artistBirthName         }",
      "OPTIONAL { ?dbpediaArtist foaf:givenName           ?artistFirstName         }",
      "OPTIONAL { ?dbpediaArtist foaf:surname             ?artistLastName          }",
      "OPTIONAL { ?dbpediaArtist foaf:gender              ?artistGender            }",
      "OPTIONAL { ?dbpediaArtist owl:sameAs               ?wikidataArtist          }",
      
      "FILTER (?dbpediaArtist = dbr:"+artist+")",
      "FILTER (?type IN (dbo:MusicalArtist, dbo:Band))",
      "FILTER (regex(?wikidataArtist, \"wikidata.org/entity\"))",
      "FILTER (lang(?artistName) = \"en\")",
      "FILTER (lang(?aboutArtist) = \"en\")",
    "} LIMIT 10",

  ].join(" ")
  var queryURL = DBP + "?query=" + encodeURIComponent(query) + "&format=json" ;
  return queryURL;
}
    
myGenreQuey(genre) {
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
    console.log("GENRE "+ query)
    return queryURL;
    }

myArtistQuery(artist){

  var DBP = "http://dbpedia.org/sparql";
 
  var query = [
    " SELECT * WHERE {",
      "?song rdfs:label        ?label ;",
      "      rdf:type   		    ?type ;",
      "      dbo:musicalArtist ?artist ;",
      "      owl:sameAs        ?same .",
      
     " FILTER (?artist=<http://dbpedia.org/resource/"+artist+">)",
     " FILTER (?type IN (dbo:MusicalWork))",
     " FILTER (?type NOT IN (dbo:Album))",
     " FILTER (regex(str(?same), 'wikidata.org/entity'))",
     " FILTER (lang(?label) = 'en')",
    "} LIMIT 100",].join(" ")
    console.log(query)
    var queryURL = DBP + "?query=" + encodeURIComponent(query) + "&format=json" ;
    return queryURL;

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
                var obj = listOfGenre[randomIndex]
                console.log("GENRETT" +obj)
                return obj
            }  
        }
      }
    }

    getRandomArtist(question, userId){
      
      for(var q in question){
        if(question[q].user_id == userId){
            if(question[q].question == "Artists"){
                var listOfGenre = question[q].answer
                var randomIndex = this.getRandomInt(listOfGenre.length)
                var obj = listOfGenre[randomIndex]
                console.log("ARTIST RESULT FROM OBJ"+ obj)
                return obj
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

  deleteExtra(string){
    if(string.search("(song)")){
      console.log('gasit')
    }
  }

  removeBrackets(string){
    if(string.indexOf('(') < string.indexOf(')' ) ){
      return string.substr(0, string.indexOf('(')).trim()
    }
    return string
  }

};
module.exports = SPARQL_service
