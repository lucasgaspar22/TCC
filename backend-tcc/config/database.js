var neo4j = require('neo4j');

// Connect to DataBase
var db = new neo4j.GraphDatabase('http://neo4j:12345678@localhost:7474');


function executeQuery(my_query,res){
    db.cypher({
        query: my_query
    }, (err, results)=>{
        if (err) throw err;
        var result = results;
        if (!result) {
            res.send("999")
        } else {
           res.send(result);
        }  
    });
}

function callback(err, results) {
    if (err) throw err;
    var result = results;
    if (!result) {
        ERR = err
    } else {
       
    }
};

module.exports = executeQuery;
