

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
}

module.exports = SPARQL_service
