'use strict';

let utils = require('./utils');
let _ = require('lodash');

const TABLE = process.env.TEAMS_TABLE_NAME;

function getSchedulesByYearAndTeamIds(year, teamIds) {
  return utils.batchQueryDb({
    RequestItems: {
      [TABLE]: {
        Keys: _(teamIds).uniq().map(id => ({ id, year })).value()
      }
    }
  }).then(data => {
    return data.Responses[TABLE];
  });
};

module.exports = {
  getSchedulesByYearAndTeamIds
};
