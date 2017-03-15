'use strict';

let config = require('config').get('teams');
let utils = require('./utils');

module.exports = function getDivsFromStatsService(year) {
  let key = `years/${year}/divs`;

  return utils.fetchFromS3(config.bucket, key);
}
