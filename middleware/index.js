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
router.delete('/api/v1/hapususer',verifikasi(), auth.hapususerku);



//mengubah menghapus dan menambah data level
router.put('/api/v1/ubahlevel',verifikasi(), auth.ubahlevel);
router.delete('/api/v1/hapusLevel',verifikasi(), auth.hapusLevelku);


//mengubah menambah dan menghapus data servis
router.put('/api/v1/ubahservis',verifikasi(), auth.ubahservis);
router.post('/api/v1/tambahservis',verifikasi(),auth.tambahservisku);
router.delete('/api/v1/hapusservis',verifikasi(), auth.hapusservisku);

//menambah mengubah dan menghapus data sparepat
router.post('/api/v1/tambahsparepat',verifikasi(), auth.tambahsparepatku);
router.put('/api/v1/ubahsparepat',verifikasi(), auth.ubahsparepatku);
router.delete('/api/v1/hapussparepat',verifikasi(), auth.hapussparepatku);

//menambah, mengubah, dan menghapus datamonir
router.post('/api/v1/tambahmontir',verifikasi(), auth.tambahmontirku);
router.put('/api/v1/ubahmontir',verifikasi(), auth.ubahmontirku);

module.exports = router;
