'use strict';

let ratingsSummary = require('./ratingsSummary');
let utils = require('./utils');
let moment = require('moment');
let _ = require('lodash');

function teamsSummary(teamsRes) {
  const teams = _.map(teamsRes, ({ team, ratings }) => 
    Object.assign({}, team, { ratings: ratingsSummary(ratings) })
  );
  const lastModified = utils.ratingsTimestamp(getFirstTeamRatings(teamsRes));
  let body = { teams };
  let headers = utils.headers({ lastModified });
  return { body, headers };
}

function getFirstTeamRatings(teams) {
  return _(teams).filter('ratings').head().ratings;
}

module.exports = teamsSummary;
