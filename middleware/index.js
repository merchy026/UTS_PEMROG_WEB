var express = require("express");
var auth = require("./auth");
var router = express.Router();
var verifikasi = require('./verifikasi');

//daftarkan menu registrasi 
router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

//alamat yang perlu otorisasi
router.get('/api/v1/rahasia', verifikasi(), auth.halamanrahasia)


// menambah, mengubah data user
router.post('/api/v1/tambahuser',verifikasi(), auth.tambahuser);
router.put('/api/v1/ubahuser',verifikasi(), auth.ubahuserku);

//mengubah data level
router.put('/api/v1/ubahlevel',verifikasi(), auth.ubahlevel);

//mengubah data servis
router.put('/api/v1/ubahservis',verifikasi(), auth.ubahservis);

//menambah mengubah dan menghapus data sparepat
router.post('/api/v1/tambahsparepat',verifikasi(), auth.tambahsparepatku);
router.put('/api/v1/ubahsparepat',verifikasi(), auth.ubahsparepatku);


module.exports = router;
