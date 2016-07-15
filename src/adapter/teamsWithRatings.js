'use strict';

let ratingsSummary = require('./ratingsSummary');

function teamsWithRatings(args) {
  let teams = args[0];
  let ratings = args[1];
  return teams.map(function(team) {
    team['ratings'] = ratingsSummary(ratings[team.id]);
    return team;
  });
}

module.exports = teamsWithRatings;
