var express = require('express');
var fs = require('fs');

var staticFolder = __dirname + '/public';

try{
  var stats = fs.lstatSync(__dirname + '/dist');
  if(stats.isDirectory()){
    staticFolder = __dirname + '/dist';
  }
} catch (ex){
  console.error(ex);
}

var staticSetting = {
    etag: true,
    lastModified: true,
    maxAge: 1000 * 3600 * 24 * 30,
    setHeaders: function (res, path) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
};

module.exports = function(app){
  app.use(express.static(staticFolder, staticSetting));
  app.use('/locales', express.static(__dirname + '/locales', staticSetting));
};
