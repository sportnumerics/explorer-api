'use strict';

let express = require('express'),
  teams = require('./controller/teams'),
  schedule = require('./controller/schedule'),
  config = require('config'),
  cors = require('cors');

var app = express();

app.use(cors({origin: config.get('corsOrigin')}));

app.get('/teams', teams);
app.get('/teams/:id/schedule', schedule);

let port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log(`Listening on localhost:${port} ...`);
});
