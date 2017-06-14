'use strict';

global.Promise = require('bluebird');
let teamsService = require('../service/teams'),
  teamsSummary = require('../adapter/teamsSummary'),
  fs = require('fs');

module.exports = function teams(params) {
  let year = params.year;
  let div = params.div;

  if (!year) {
    throw new InvalidRequestError('You must specify a year.');
  }

  if (!div) {
    throw new InvalidRequestError('You must specify a division.');
  }

  return teamsService.getTeamsByYearAndDiv(year, div)
    .then(teamsSummary);
};
