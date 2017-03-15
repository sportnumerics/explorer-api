'use strict';

global.Promise = require('bluebird');
let getRatings = require('../service/ratings'),
  getSchedule = require('../service/schedule'),
  joinGamesWithPredictions = require('../adapter/gamesWithPredictions');

module.exports = function schedule(params) {
  let year = params.year;
  let div = params.div;
  let teamId = params.id;

  if (!year) {
    throw new Error('You must specify a year.');
  }

  if (!div) {
    throw new Error('You must specify a division');
  }

  if (!teamId) {
    throw new Error('You must specify a team id');
  }

  return Promise.all([teamId, getSchedule(year, teamId), getRatings(year, div)])
    .then(joinGamesWithPredictions);
};
