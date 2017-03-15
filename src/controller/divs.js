'use strict';

let getDivs = require('../service/divs');

module.exports = function divs(params) {
  let year = params.year;

  if (!year) {
    throw new Error('You must specify a year.');
  }

  return getDivs(year);
}
