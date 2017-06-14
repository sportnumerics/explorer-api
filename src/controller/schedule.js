'use strict';

global.Promise = require('bluebird');
let scheduleService = require('../service/schedule'),
  teamSummary = require('../adapter/teamSummary'),
  extractOpponentIds = require('../adapter/extractOpponentIds'),
  InvalidRequestError = require('../model/errors').InvalidRequestError;

module.exports = function schedule(params) {
  let year = params.year;
  let teamId = params.id;

  if (!year) {
    throw new InvalidRequestError('You must specify a year.');
  }

  if (!teamId) {
    throw new InvalidRequestError('You must specify an integer team id');
  }

  return scheduleService.getSchedulesByYearAndTeamIds(year, [teamId])
    .then(extractOpponentIds)
    .then(({ teamRes, opponentIds }) => {
      return Promise.props({
        teamRes: teamRes,
        opponentsRes: scheduleService.getSchedulesByYearAndTeamIds(year, opponentIds)
      });
    })
    .then(teamSummary);
};
