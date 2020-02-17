'use strict';

let ratingsSummary = require('./ratingsSummary');
let utils = require('./utils');
let moment = require('moment');
let _ = require('lodash');

function teamsSummary(divRes) {
  const teams = _.map(divRes.teams, ({ id, name, ratings, record, rank }) => ({
    id,
    name,
    ratings: ratingsSummary(ratings),
    record,
    rank
  }));
  const lastModified = utils.ratingsTimestamp(
    getFirstTeamRatings(divRes.teams)
  );
  let body = { teams };
  let headers = utils.headers({ lastModified });
  return { body, headers };
}

function getFirstTeamRatings(teams) {
  const firstTeam = _(teams)
    .filter('ratings')
    .head();
  if (firstTeam) {
    return firstTeam.ratings;
  } else {
    return {};
  }
}

module.exports = teamsSummary;
