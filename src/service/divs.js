'use strict';

let config = require('config').get('teams');
let utils = require('./utils');

function getDivsByYear(year) {
  let key = `years/${year}/divs`;

  return utils.fetchFromS3(config.bucket, key);
}

module.exports = {
  getDivsByYear
};
