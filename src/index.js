'use strict';

let express = require('express'),
  teams = require('./controller/teams'),
  schedule = require('./controller/schedule'),
  config = require('config');

var app = express();

app.get('/teams', teams);
app.get('/teams/:id/schedule', schedule);

let port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log(`Listening on localhost:${port} ...`);
});
