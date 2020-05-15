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
            console.log(error);
        }else{
            response.ok(rows, res)
        }
    });
};

//menampilkan semua data sparepat berdasarkan id  
exports.tampilsparepatberdasarkanid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM t_sparepat WHERE id_sparepat = ?',[id],
    function(error, rows, fileds){
        if(error){
            console.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};


//menampilkan semua data montir
exports.tampilmontir = function(req,res){
    connection.query('SELECT * FROM t_montir', function(error, rows, fileds){
        if(error){
            console.log(error);
        }else{
            response.ok(rows, res)
        }
    });
};

//menampilkan semua data montir berdasarkan id  
exports.tampilmontirberdasarkanid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM t_montir WHERE id_montir = ?',[id],
    function(error, rows, fileds){
        if(error){
            console.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};




//menambahkan data servis
exports.tambahservisan = function(req,res){
    var tgl_servis = req.tgl_servis;
    var id_user = req.body.id_user;
    var id_montir = req.body.id_montir;
    var jumlah_sparepat = req.body.jumlah_sparepat;
    var id_sparepat = req.body.id_sparepat;

    connection.query('INSERT INTO t_servis (tgl_servis,id_user,id_montir,jumlah_sparepat,id_sparepat) VALUES(?,?,?,?,?)',
    [tgl_servis,id_user,id_montir,jumlah_sparepat,id_sparepat],
    function (error, rows, fileds){
        if(error){
            console.log(error);
        }else{
            response.ok("berhasil menambahkan data servis",res)
        }
    });
};

//menambahkan data montir
exports.tambahmontirku = function (req, res) {
    var nama_montir = req.body.nama_montir;
    var harga_perjam = req.body.harga_perjam;
    

    connection.query('INSERT INTO t_montir (nama_montir,harga_perjam) VALUES(?,?)',
        [nama_montir, harga_perjam],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menambahkan Data Montir", res)
            }
        });
};

//menambahkan data Sparepat
exports.tambahsparepatku = function (req, res) {
    var nama_sparepat = req.body.nama_sparepat;
    var harga_sparepat = req.body.harga_sparepat;
    var satuan = req.body.satuan;
    

    connection.query('INSERT INTO t_sparepat (nama_sparepat,harga_sparepat,satuan) VALUES(?,?,?)',
        [nama_sparepat, harga_sparepat,satuan], 
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menambahkan Data Sparepat", res)
            }
        });
};

//input data user
exports.tambahuserku = function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;

    connection.query('INSERT INTO t_user (username,email,password,role) VALUES (?,?,?,?)',
    [username,email,password,role],

        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menambahkan User", res);
            }
        });
}

//input data level
exports.tambahlevelku = function (req, res) {
    var nama_level = req.body.nama_level;

    connection.query('INSERT INTO t_level (nama_level) VALUES (?)',
    [nama_level],

        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menambahkan User", res);
            }
        });
}

//Mengedit Data Monir berdasarkan id
exports.ubahmontirku = function (req, res) {
    var id_montir = req.body.id_montir;
    var nama_montir = req.body.nama_montir;
    var harga_perjam = req.body.harga_perjam;

    connection.query('UPDATE t_montir SET nama_montir=?, harga_perjam=? WHERE id_montir=?', [nama_montir, harga_perjam, id_montir],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Ubah Data", res)
            }
        });
};

//mengedit data Sparepat
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
                response.ok("Berhasil Ubah Data", res)
            }
        });
};


