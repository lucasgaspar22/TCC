var neo4j = require('neo4j');
//var neo4j = require('neo4j-driver').v1;
// Connect to DataBase
var db = new neo4j.GraphDatabase('http://neo4j:1234@localhost:7474');

// function executeQuery(my_query,res){
//     var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic('neo4j', '1234'));
//     var session = driver.session();
//     session.run(my_query)
//     .then(function(result) {
//       result.records.forEach(function(record) {
//         res.send(record._fields);
//       });
//       session.close();
//       driver.close();
//     })
//     .catch(function(error) {
//       console.log(error);
//       driver.close();
//     });
//     //driver.close();
// }

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

module.exports = executeQuery;
