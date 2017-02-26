'use strict';

let ratingsSummary = require('./ratingsSummary');

function teamsWithRatings(args) {
  let teams = args[0];
  let ratings = args[1];
  return teams.map(function(team) {
    if (ratings[team.id] !== 'undefined') {
      return Object.assign({}, team, {ratings: ratingsSummary(ratings[team.id])});
    } else {
      return Object.assign({}, team);
    }
  });
}

module.exports = teamsWithRatings;
