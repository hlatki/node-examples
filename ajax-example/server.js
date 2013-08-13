var express = require('express'); //Express will serve our files for us
var app = express();
var http = require('http');

var server = http.createServer(app);

var surveyAnswers = [];

// Configure Express
app.configure(function() {
    app.set('port', 8080); //this tells express what port we want to run on
    app.use(express.logger('dev'));
    app.use(express.static(__dirname + '/static')); //these are the files we want to serve
    app.use(express.bodyParser()); // this is needed so we can see what the client sent in the form
    app.use(app.router);
});


// This will allow us to save survey answers
app.post('/saveResponse', function(req, res){
    console.log("Survey Answers Received: ");
    console.log(req.is('json')) 
    console.log(req.body);
    surveyAnswers.push(req.body);
    console.log(surveyAnswers);
    res.writeHead(200,{'Content-Type': 'application/json'});
    res.write(JSON.stringify(surveyAnswers));
    res.end();
});


// Start listening on port (which we set to 8080 above)
server.listen(app.get('port'));

