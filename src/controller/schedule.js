'use strict';

global.Promise = require('bluebird');
let ratingsService = require('../service/ratings'),
  scheduleService = require('../service/schedule'),
  joinGamesWithPredictions = require('../adapter/gamesWithPredictions'),
  InvalidRequestError = require('../model/errors').InvalidRequestError;

module.exports = function schedule(params) {
  let year = params.year;
  let div = params.div;
  let teamId = params.id;

  if (!year) {
    throw new InvalidRequestError('You must specify a year.');
  }

  if (!div) {
    throw new InvalidRequestError('You must specify a division');
  }

  if (!teamId) {
    throw new InvalidRequestError('You must specify a team id');
  }

  return Promise.all([
      teamId,
      scheduleService.getScheduleByYearAndTeamId(year, teamId),
      ratingsService.getRatingsByYearAndDiv(year, div)])
    .then(joinGamesWithPredictions);
};
