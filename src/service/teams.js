'use strict';

let config = require('config').get('teams');
let utils = require('./utils');

function getTeamsByYearAndDiv(year, div) {
  let key = `years/${year}/divs/${div}/teams`;

  return utils.fetchFromS3(config.bucket, key);
};

module.exports = {
  getTeamsByYearAndDiv
};
