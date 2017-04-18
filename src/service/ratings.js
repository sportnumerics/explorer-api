'use strict';

let utils = require('./utils');
let config = require('config').get('ratings');

function getRatingsByYearAndDiv(year, div) {
  let key = `years/${year}/divs/${div}/ratings.json`;

  return utils.fetchFromS3(config.bucket, key);
}

module.exports = {
  getRatingsByYearAndDiv
};
