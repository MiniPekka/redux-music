// This is the API Server that talks to SoundCloud.
var express = require('express');
var bodyParser = require('body-parser');
var v1 = require('./routes/v1');
var v2 = require('./routes/v2');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 3001;

// Simple logger
function logger(req, res, next) {
  console.log(new Date(), req.method, req.url);
  next();
}

app.use(logger);

app.use('/sc/api-v1', v1);
app.use('/sc/api-v2', v2);

app.listen(PORT, () => {
  console.log(`API Server Started at:${PORT}`);
});
