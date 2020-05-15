var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('MD5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//controller untuk register      
exports.registrasi = function(req, res) {
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role:  req.body.role,
        tanggal_daftar: new Date()
    }
    
    //registrasi berhasil dengan username yang tidak bisa sama setelah menambahkan WHERE ??=? DAN res di baris ke 41
    var query ="SELECT email FROM ?? WHERE ??=?";
    var table = ["t_user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["t_user"];
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                        response.ok("berhasil menambahkan data user baru", res);
                    }
                });
            }else{
                response.ok("email sudah terdaftar", res);
            }
        }
    });
}
//controller untuk login
exports.login = function(req, res){
    var post = {
        password: req.body.password,
        email: req.body.email,
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table =["t_user", "password",md5(post.password), "email", post.email];

    query = mysql.format(query,table);
    connection.query(query, function(error,rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){
                var token = jwt.sign({rows}, config.secret, {
                    expiresIn: 2400
                });
                id_user = rows[0].id;

                var data = {
                    id_user:id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token"];

                query = mysql.format(query, table);
                connection.query(query, data, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                        res.json({
                            success: true,
                            message: 'Token JWT tergenerate',
                            token: token,
                            currUser: data.id_user
                        });
                    }
                });
            }else{
                res.json({"Error": true, "Message":"Email atau password salah!"});
            }
        }
    });
}


exports.halamanrahasia = function(req,res){
    response.ok("Halaman ini hanya untk user dengan role 1!",res);
}

//mengubah data di tabel User
exports.ubahuserku = function (req, res) {
    var id = req.body.id;
    var nama_user = req.body.nama_user;
    var email = req.body.email;
    var password = md5(req.body.password);
    var role = req.body.role;
    var tanggal_daftar = req.body.tanggal_daftar;

    connection.query('UPDATE t_user SET nama_user=?, email=?, password=?, role=? , tanggal_daftar=? WHERE id=?',
        [nama_user, email, password, role,tanggal_daftar, id], 
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Mengubah Data user", res)
            }
        });
};


//mengubah data di tabel level
exports.ubahlevel = function (req, res) {
    var id_level = req.body.id_level;
    var nama_level = req.body.nama_level;
    
    connection.query('UPDATE t_level SET nama_level=? WHERE id_level=?',
        [id_level,nama_level], 
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Mengubah Data Level", res)
            }
        });
};

