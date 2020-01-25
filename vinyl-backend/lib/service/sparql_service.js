
var rdfstore = require('rdfstore');

class SPARQL_service {
    
myQuery(artist,title) {
    var DBP = "http://dbpedia.org/sparql";
    var query = [
    
        "SELECT ?members ?bandName where {",
            "?band dbo:genre dbr:Punk_rock .",
            "?band dbp:currentMembers ?members .",
            "?band foaf:name ?bandName",
            "FILTER(langMatches(lang(?bandName), \"en\"))",
           "}"].join(" ")
         

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
};
module.exports = SPARQL_service
