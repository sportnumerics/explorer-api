'use strict';

global.Promise = require('bluebird');
let getRatings = require('../service/ratings'),
  getTeams = require('../service/teams'),
  joinTeamsWithRatings = require('../adapter/teamsWithRatings');

module.exports = function teams(params) {
  let div = params.div;

  return Promise.all([getTeams(div), getRatings(div)])
    .then(joinTeamsWithRatings)
    .then(teams => {
      return {teams};
    });
};
