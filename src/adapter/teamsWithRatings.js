'use strict';

let ratingsSummary = require('./ratingsSummary');
let utils = require('./utils');

function teamsWithRatings({ teamsRes, ratingsRes }) {
  let teams = teamsRes.data.teams;
  let ratings = ratingsRes.data.ratings;
  let meta = ratingsRes.meta;
  teams = teams.map(function(team) {
    return Object.assign({}, team, {ratings: ratingsSummary(ratings[team.id])});
  });
  let body = { teams };
  let headers = utils.headers(meta);
  return { body, headers };
}

module.exports = teamsWithRatings;
