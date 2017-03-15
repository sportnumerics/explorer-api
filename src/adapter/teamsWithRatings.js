'use strict';

let ratingsSummary = require('./ratingsSummary');

function teamsWithRatings(args) {
  let teams = args[0].teams;
  let ratings = args[1].ratings;
  let meta = args[1].meta;
  teams = teams.map(function(team) {
    return Object.assign({}, team, {ratings: ratingsSummary(ratings[team.id])});
  });
  return { teams, meta };
}

module.exports = teamsWithRatings;
