'use strict';

global.Promise = require('bluebird');
let getRatings = require('../service/ratings'),
  getTeams = require('../service/teams'),
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

  return Promise.all([getTeams(year, div), getRatings(year, div)])
    .then(joinTeamsWithRatings);
};
