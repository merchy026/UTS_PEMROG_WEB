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
            if(rows.length == 1){
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
    var username = req.body.username;
    var email = req.body.email;
    var password = md5(req.body.password);
    var role = req.body.role;
    var tanggal_daftar = req.body.tanggal_daftar;

    connection.query('UPDATE t_user SET username=?, email=?, password=?, role=? , tanggal_daftar=? WHERE id=?',
        [username, email, password, role,tanggal_daftar, id], 
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


//mengubah data di tabel service
exports.ubahservis = function (req, res) {
    var tgl_servis = new Date();
    var id_user = req.body.id_user;
    var id_montir = req.body.id_montir;
    var jumlah_sparepat = req.body.jumlah_sparepat;
    var id_sparepat = req.body.id_sparepat;
    var id_servis = req.body.id_servis;
    
    connection.query('UPDATE t_service SET tgl_servis=?, id_user=?, id_montir=?, jumlah_sparepat=?, id_sparepat=? WHERE id_servis=?',
        [ tgl_servis, id_user, id_montir, jumlah_sparepat, id_sparepat,id_servis], 
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Mengubah Data servis", res)
            }
        });
};


//controller untuk user
exports.tambahuser = function(req,res) {
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        level: req.body.level,
        tanggal_daftar: new Date()
    }

    var query = "SELECT username FROM ?? WHERE ??=?";
    var table = ["t_user", "username", post.nama_user];

    query = mysql.format(query,table);

    connection.query(query, function(error, rows) {
        if(error){
            console.log(error);
        }else {
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["t_user"];
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                    if(error){
                        console.log(error);
                    }else {
                        response.ok("Berhasil menambahkan data user baru", res);
                    }
                });
            }else {
                response.ok("user sudah terdaftar!",res);
            }
        }
    })
}


//controller untuk input data sparepat
exports.tambahsparepatku = function(req, res) {
    var post = {
        nama_sparepat: req.body.nama_sparepat,
        harga_sparepat: req.body.harga_sparepat,
        satuan: req.body.satuan
    }

    var query = "SELECT nama_sparepat FROM ?? WHERE ??=?";
    var table = ["t_sparepat", "nama_sparepat", post.nama_sparepat];

    query = mysql.format(query,table);

    connection.query(query, function(error,rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["t_sparepat"];
                query = mysql.format(query,table);
                connection.query(query, post, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                        response.ok("Berhasil menambahkan data Sparepat baru", res);
                    }
                });
            }else{
                response.ok("Sparepat sudah terdaftar!",res);
            }
        }
    });
};

//mengubah data di tabel Sparepat
exports.ubahsparepatku = function (req, res) {
    var id_sparepat = req.body.id_sparepat;
    var nama_sparepat = req.body.nama_sparepat;
    var harga_sparepat = req.body.harga_sparepat;
    var satuan = req.body.satuan;
    
    connection.query('UPDATE t_sparepat SET nama_sparepat=?, harga_sparepat=?, satuan=? WHERE id_sparepat=?',
     [nama_sparepat, harga_sparepat, satuan, id_sparepat],
    function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Mengubah Data Sparepat", res)
            }
        });
};


//Menghapus data sparepat berdasarkan id
exports.hapussparepatku = function(req, res){
    var id = req.body.id_sparepat;
    connection.query('DELETE FROM t_sparepat WHERE id_sparepat=?', [id],
    function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil Hapus Data Sparepat", res)
        }
    });
};


//menambahkan data servis
exports.tambahservisku = function (req, res) {
    var post = {
     tgl_servis: new Date(),
     id_user: req.body.id_user,
     id_montir: req.body.id_montir,
     jumlah_sparepat: req.body.jumlah_sparepat,	
     id_sparepat: req.body.id_sparepat
     
    }
      var query = "SELECT tgl_servis FROM ?? WHERE ??=?";
    var table = ["t_servis", "tgl_servis", post.tgl_servis];

    query = mysql.format(query,table);

    connection.query(query, function(error,rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["t_servis"];
                query = mysql.format(query,table);
                connection.query(query, post, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                        response.ok("Berhasil menambahkan data Servis baru", res);
                    }
                });
            }else{
                response.ok("Servis sudah terdaftar!",res);
            }
        }
    });
};

//menghapus data tabel servis
exports.hapusservisku = function(req, res){
    var id = req.body.id_servis;
    connection.query('DELETE FROM t_servis WHERE id_servis=?', [id],
    function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil Hapus Data servis", res)
        }
    });
};


//menghaous data level berdasarkan id
exports.hapusLevelku = function(req, res){
    var id = req.body.id_level;
    connection.query('DELETE FROM t_level WHERE id_level=?', [id],
    function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil Hapus Data Level", res)
        }
    });
};
