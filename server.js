var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    port =  process.env.PORT || 8000;

// APP CONFIG -------
// use body parser to grab POST request info
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

// Log requests to console
app.use(morgan('dev'));

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// MAIN CATCHALL ROUTE --------------
// SEND USERS TO FRONTEND -----------
// has to be registered after any API ROUTES
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// START THE SERVER ---------------
app.listen(port);
console.log('Magic happening on port ' + port);
