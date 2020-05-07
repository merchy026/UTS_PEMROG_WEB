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


//menambahkan data sparepat
exports.tambahsparepat = function(req,res){
    var id_sparepat = req.body.id_sparepat;
    var nama_sparepat = req.body.nama_sparepat;
    var harga_sparepat = req.body.harga_sparepat;
    var satuan = req.body.satuan;

    connection.query('INSERT INTO t_sparepat (id_sparepat,nama_sparepat,harga_sparepat,satuan) VALUES(?,?,?,?)',
    [id_sparepat,nama_sparepat,harga_sparepat,satuan],
    function (error, rows, fileds){
        if(error){
            console.log(error);
        }else{
            response.ok("berhasil menambahkan data sparepat",res)
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



