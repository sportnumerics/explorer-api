'use strict';

global.Promise = require('bluebird');
let ratingsService = require('../service/ratings'),
  scheduleService = require('../service/schedule'),
  teamsService = require('../service/teams'),
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
    throw new InvalidRequestError('You must specify an integer team id');
  }

  return Promise.props({
      teamId,
      scheduleRes: scheduleService.getScheduleByYearAndTeamId(year, teamId),
      ratingsRes: ratingsService.getRatingsByYearAndDiv(year, div),
      teamsRes: teamsService.getTeamsByYearAndDiv(year, div)
    }).then(joinGamesWithPredictions);
};
