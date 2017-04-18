'use strict';

let config = require('config').get('teams');
let utils = require('./utils');

function getScheduleByYearAndTeamId(year, teamId) {
  let key = `years/${year}/teams/${teamId}/schedule`;

  return utils.fetchFromS3(config.bucket, key);
};

module.exports = {
  getScheduleByYearAndTeamId
};
