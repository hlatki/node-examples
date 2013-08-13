var express = require('express'); //Express will serve our files for us
var app = express();
var http = require('http');

var server = http.createServer(app);

// Configure Express
app.configure(function() {
    app.set('port', 8080);
    app.use(express.logger('dev'));
    app.use(express.static(__dirname + '/static')); //these are the files we want to serve
    app.use(app.router);
});

// Start listening on port (which we set to 8080 above)
server.listen(app.get('port'));

