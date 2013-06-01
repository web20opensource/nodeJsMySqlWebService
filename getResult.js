//http server
var http = require('http');
//url.parse
var url = require('url');
//id to query from db
var id;
//response
var body;

//mysql + conf
var _mysql = require('mysql');
var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'nodejs';
var MYSQL_PASS = '123456';
var DATABASE = 'resultados_2011';
var TABLE = 'resultados_2011';

//mysqlConnection
var mysql = _mysql.createConnection({
    host: HOST,
    port: PORT,
    user: MYSQL_USER,
    password: MYSQL_PASS,
});

//console.log(mysql);
//return;
//use database
mysql.query('use ' + DATABASE);


// createServer + doQuery
http.createServer(function (req, res) {
  
    //get id from url
    var url_parts = url.parse(req.url, true);
    var id = url_parts.query.id; 

    // create&execute query
    mysql.query('select * from ' + TABLE + ' where matricula ="'+id+'";',
    function(err, result, fields) {
        body = result[0]
        if (err) throw err;
        else {
                //console.log('Row next to be json');
                //console.log(JSON.stringify(result[0]));
                res.writeHead(200, {'Content-Type': 'application/json'});
                if (typeof body === "undefined")
                    response = '[{}]';
                else
                    response = '['+JSON.stringify(body)+']';
                res.write(response);
                res.end();
            }
    });
}).listen(1337, 'localhost');
