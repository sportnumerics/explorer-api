'use strict';

global.Promise = require('bluebird');
let ratingsService = require('../service/ratings'),
  teamsService = require('../service/teams'),
  joinTeamsWithRatings = require('../adapter/teamsWithRatings');

module.exports = function teams(params) {
  let year = params.year;
  let div = params.div;

  if (!year) {
    throw new InvalidRequestError('You must specify a year.');
  }

  if (!div) {
    throw new InvalidRequestError('You must specify a division.');
  }

  return Promise.props({
      teamsRes: teamsService.getTeamsByYearAndDiv(year, div),
      ratingsRes: ratingsService.getRatingsByYearAndDiv(year, div)
    }).then(joinTeamsWithRatings);
};
