// This code will start a server that will send a simple HTML page
// to the client

// This includes some code that will handle HTTP us
var http = require('http');


// This is the page we want to send
// The lines end in + because you cant have multi line strings in JavaScript,
// so we make one string per line and combine them with +
var OUR_HTML = "<!DOCTYPE html>" + 
"<head>" + 
"   <meta charset='utf-8'>" + 
        "<title>My webpage</title>" + 
        "<meta name='description' content=''>" + 
        "<meta name='viewport' content='width=device-width, initial-scale=1'>" + 
    "</head>" + 
    "<body>" +
        "<h1>This is a webpage</h1>" + 
        "<p>And here is a paragraph</p>" + 
    "</body>" + 
"</html>";


// This creates an HTTP server
// whenever a client connects, it will send them our simple page
// so, every time someone connects, the code inside the braces will run
http.createServer( function(request, response) {
    //This tells the client that the everything is ok and that it will be
    //sending it some HTML
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(OUR_HTML); //now we send the HTML
    response.end(); // now we end or response
}).listen(8080); // This tells the server to listen on port 8080 for new
                // connections
