/* jshint node: true */
'use strict';

var http = require('http');
var port = process.env.PORT || 8080;
var FS = require('fs');
var Path = require('path');

http.createServer(function(req, res) {
    if (/\/booking\/(.+)/i.test(req.url)) {
        return getBooking(req, res);
    }
    serve404(req, res);
}).listen(port);

function serve404(req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 Not Found\n');
    res.end();
}

function getBooking(req, res) {
    var filename = Path.join(process.cwd(), 'mocks', 'booking.json');
    res.writeHead(200, {'Content-Type': 'text/json'});
    FS.createReadStream(filename).pipe(res);
}

console.log('Listening on %d', port);
