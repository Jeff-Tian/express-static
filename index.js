var express = require('express');
var fs = require('fs');

var staticSetting = {
    etag: true,
    lastModified: true,
    maxAge: 1000 * 3600 * 24 * 30,
    setHeaders: function (res, path) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
};

module.exports = function(app, dirname){
  var staticFolder = dirname + '/public';
  
  try{
    var stats = fs.lstatSync(dirname + '/dist');
    if(stats.isDirectory()){
      staticFolder = dirname + '/dist';
    }
  } catch (ex){
    console.error(ex);
  }

  app.use(express.static(staticFolder, staticSetting));
  app.use('/locales', express.static(dirname + '/locales', staticSetting));
};
