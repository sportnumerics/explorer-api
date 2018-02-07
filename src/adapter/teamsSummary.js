'use strict';

let ratingsSummary = require('./ratingsSummary');
let utils = require('./utils');
let moment = require('moment');
let _ = require('lodash');

function teamsSummary(teamsRes) {
  const teams = _.map(teamsRes, ({ id, name, ratings }) => (
    { id, name, ratings: ratingsSummary(ratings) }
  ));
  const lastModified = utils.ratingsTimestamp(getFirstTeamRatings(teamsRes));
  let body = { teams };
  let headers = utils.headers({ lastModified });
  return { body, headers };
}

function getFirstTeamRatings(teams) {
  const firstTeam = _(teams).filter('ratings').head();
  if (firstTeam) {
    return firstTeam.ratings;
  } else {
    return {};
  }
}

module.exports = teamsSummary;
