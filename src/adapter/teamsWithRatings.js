'use strict';

let ratingsSummary = require('./ratingsSummary');

function teamsWithRatings(args) {
  let teams = args[0].teams;
  let ratings = args[1].ratings;
  let meta = args[1].meta;
  teams = teams.map(function(team) {
    return Object.assign({}, team, {ratings: ratingsSummary(ratings[team.id])});
  });
  let body = { teams };
  let headers = { 'Last-Modified': meta.lastModified };
  return { body, headers };
}

module.exports = teamsWithRatings;
