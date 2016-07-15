'use strict';

require('es6-promise').polyfill();
let getRatings = require('../service/ratings'),
  getSchedule = require('../service/schedule'),
  joinGamesWithPredictions = require('../adapter/gamesWithPredictions');

module.exports = function schedule(req, res) {
  let teamId = req.params.id;

  Promise.all([teamId, getSchedule(teamId), getRatings()])
    .then(joinGamesWithPredictions)
    .then(schedule => {
      res.json({schedule})
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({error:"Internal Server Error"});
    });
};
