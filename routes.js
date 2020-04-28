'use strict';
 
module.exports = function(app){
    var jsonku = require('./');

    app.route('/')
        .get(jsonku.index);
}