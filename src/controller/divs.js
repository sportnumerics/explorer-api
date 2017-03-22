'use strict';

let getDivs = require('../service/divs');
let InvalidRequestError = require('../model/errors').InvalidRequestError;

module.exports = function divs(params) {
  let year = params.year;

  if (!year) {
    throw new InvalidRequestError('You must specify a year.');
  }

  return getDivs(year);
}
