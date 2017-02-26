'use strict';

global.Promise = require('bluebird');
let getRatings = require('../service/ratings'),
  getSchedule = require('../service/schedule'),
  joinGamesWithPredictions = require('../adapter/gamesWithPredictions');

module.exports = function schedule(params) {
  let div = params.div;
  let teamId = params.id;

  return Promise.all([teamId, getSchedule(teamId), getRatings(div)])
    .then(joinGamesWithPredictions)
    .then(schedule => {
      return {schedule};
    });
};
