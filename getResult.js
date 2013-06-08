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
/*var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';
var MYSQL_PASS = '';
*/
var DATABASE = 'resultados_2011';
var TABLE = 'resultados_2011';


var pool  = _mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : ''
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
  
    //get id from url
    var url_parts = url.parse(req.url, true);
    var id = url_parts.query.id; 

    pool.getConnection(function(err, connection) {
        
        /*if (typeof err  !== 'undefined'){
            console.log('ok');
            console.dir(typeof err);
        }
        else{
            console.log('shit!!!');
            console.dir(typeof err);
        }
        return;*/

        connection.query('use ' + DATABASE);
        connection.query('select * from ' + TABLE + ' where matricula ="'+id+'";',
            function(err, result, fields) {
               /* if (typeof err === 'undefined')
                    console.log(err.keys.length);
                else
                    console.log(err.keys.length);
                return;*/

                body = result
                //console.log(result.length);
                //return;
                if (err) throw err;
                else {
                        //console.log('Row next to be json');
                        //console.log(JSON.stringify(result[0]));
                        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                        if (typeof body === "undefined")
                            response = '[{}]';
                        else
                            response = '['+JSON.stringify(body)+']';
                        res.write(response);
                        res.end();
                    }
            });
        connection.end();        
    });
}).listen(1337, '67.207.139.8');
