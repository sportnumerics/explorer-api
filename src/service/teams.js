'use strict';

let config = require('config').get('teams');
let utils = require('./utils');

module.exports = function getTeamsFromStatsService(year, div) {
  let key = `years/${year}/divs/${div}/teams`;

  return utils.fetchFromS3(config.bucket, key);
};
