// This is the production server hosting files in dist folder.
// Api server has been separated to another project called redux-music-api
// Just like in development we use webpack-dev-server.
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var PORT = process.env.PORT || 3000;

var distPath = path.join(__dirname, '..', 'dist');

// Here we have to match publicPath in webpack production config file.
app.use(express.static(distPath));

// Simple logger
function logger(req, res, next) {
    console.log(new Date(), req.method, req.url);
    next();
}

app.use(logger);

// Always serve the index.html page and let the client side handle the routing
app.use(function (req, res) {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Production content server started at:${PORT}`);
});
