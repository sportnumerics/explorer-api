'use strict';

let ratingsSummary = require('./ratingsSummary');
let utils = require('./utils');

function teamsWithRatings(args) {
  let teams = args[0].data.teams;
  let ratings = args[1].data.ratings;
  let meta = args[1].meta;
  teams = teams.map(function(team) {
    return Object.assign({}, team, {ratings: ratingsSummary(ratings[team.id])});
  });
  let body = { teams };
  let headers = utils.headers(meta);
  return { body, headers };
}

module.exports = teamsWithRatings;
