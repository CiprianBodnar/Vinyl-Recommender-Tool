sparql = require("sparql");
client = new sparql.Client("http://dbpedia.org/sparql")


client.query('select distinct ?name where { ?s foaf:name ?name } limit 10', (err, res) => {
    for (rdf_value in res){
        console.log( rdf_value.value ) 
    }
})
   