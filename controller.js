'use stricth';
var response = require('./res');
var connection = require('./koneksi');


exports.index = function(req, res){
    response.ok("Aplikasi DB Bengkelku Berjalan",res)
};

//menampilkan semua data sparepat
exports.tampilsemuasparepat = function(req,res){
    connection.query('SELECT * FROM t_sparepat', function(error, rows, fileds){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, res)
        }
    });
};