'use strict';

let config = require('config').get('teams');
let utils = require('./utils');

module.exports = function getScheduleFromStatsService(year, teamId) {
  let key = `years/${year}/teams/${teamId}/schedule`;

  return utils.fetchFromS3(config.bucket, key);
};
