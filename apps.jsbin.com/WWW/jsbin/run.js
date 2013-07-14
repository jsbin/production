require('nodetime').profile({
  accountKey: '<TODO-PUT-IN-CONFIG>',
  appName: 'jsbin.com'
});

var jsbin = require('./lib/app');
var gzippo = require('gzippo');
var fs = require('fs');

jsbin.use(gzippo.compress());

jsbin.on('before', function () {
  jsbin.use(function (req, res, next) {
//    if (req.ip == '93.97.184.95') stream.write(req.originalUrl + '\n');

    var v3betaurl = jsbin.set('url prefix') + '/3/',
        host = req.header('host', '');

    if (req.url.indexOf(v3betaurl) === 0) {
      res.redirect(301, req.url.substring(v3betaurl.length - 1));
    } else if (host.indexOf('www') === 0 || host.indexOf('3.') === 0 || host.indexOf('apps.') === 0) {
      res.redirect(301, jsbin.set('url full') + req.url);
    } else {
      next();
    }
  });
});

jsbin.connect();
