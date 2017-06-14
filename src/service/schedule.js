'use strict';

let config = require('config').get('teams');
let utils = require('./utils');
let _ = require('lodash');

const TABLE = process.env.TEAMS_TABLE_NAME;

function getSchedulesByYearAndTeamIds(season, teamIds) {
  return utils.batchQueryDb({
    RequestItems: {
      [TABLE]: {
        Keys: _(teamIds).uniq().map(id => ({ id, season })).value()
      }
    }
  }).then(data => {
    return data.Responses[TABLE];
  });
};

module.exports = {
  getSchedulesByYearAndTeamIds
};
