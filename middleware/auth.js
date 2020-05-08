var connction = require('../koneksi');
var mysql = require('mysql');
var md5 = require('MD5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//controller untuk registrasi
exports.registrasi = function(req, res) {
    var post = {
        username: req.body.username,
        email = req.body.email,
        password = req.body.password,
        level = req.body.level,
        tanggal_daftar = new Date()
    }
    
    var query ="SELECT email FROM ?? WHERE ??";
    var table = ("user", "email", pos.email);

    query = mysql.format(query, table);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query = mysql.format(query, table);
                connction.query(query, post, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                        response.ok("Berhasil menambahkan data user baru", res);
                    }
                });
            }else{
                response.ok("Email sudah terdaftar");
            }
        }
    })
}