//http server
var http = require('http');
//url.parse
var url = require('url');
//id to query from db
var id;
//response
var body;
//# of responses sucessfully attended
var nResponses=0;
//mysql + conf

var _mysql = require('mysql');
/*var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';
var MYSQL_PASS = '';
*/
var DATABASE = 'resultados_2013';
var TABLE = 'resultados_2013';


var pool  = _mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'resultados_2013'
  //,debug : 'true'
});


/*
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
*/




// createServer + doQuery
http.createServer(function (req, res) {
  
    pool.getConnection(function(err, connection) {
        
        if (err)
        {
            res.write('[{connectionError}]');
            res.end();
            console.log(err);
            return;
        }
        
        if (!connection){
            res.write('[{connectionError}]');
            res.end();
            console.log(connection.toString());
            return;
        }

        //get id from url_parts
        var url_parts = url.parse(req.url, true);
        var id = url_parts.query.id; 

        connection.query('use ' + DATABASE);
        connection.query('select * from ' + TABLE + ' where matricula ='+_mysql.escape(id)+';',
            function(err, result, fields) {
                if (err){ console.log("error");throw err;}
                else {
                        body = result;
                        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                        if (typeof body === "undefined")
                            response = '[{}]';
                        else{
                            response = JSON.stringify(body);
                            console.log('nResponses: ' + nResponses + ' ' + JSON.stringify(body));
                            res.write(response);
                            console.log('nResponses: '+nResponses);
                        }    
                        res.end();
                        connection.end(); 
                    }
            });
    });
    nResponses++;
}).listen(1337, 'localhost');
