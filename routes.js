'use strict';
 
module.exports = function(app){
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    app.route('/tampil')
        .get(jsonku.tampilsemuasparepat);

    app.route('/tampil/:id')
        .get(jsonku.tampilsparepatberdasarkanid);

    app.route('/tampilmontir')
        .get(jsonku.tampilmontir);

    app.route('/tampilmontir/:id')
        .get(jsonku.tampilmontirberdasarkanid);   
    
    app.route('/tambahservis')
        .post(jsonku.tambahservisan);  
        
    app.route('/tambahmontir')
        .post(jsonku.tambahmontirku);

    app.route('/tambahsparepat')
        .post(jsonku.tambahsparepatku);
     
    app.route('/tambahuser')
        .post(jsonku.tambahuserku);

    app.route('/tambahlevel')
        .post(jsonku.tambahlevelku);

    app.route('/ubahmontir')
    .put(jsonku.ubahmontirku);





} 