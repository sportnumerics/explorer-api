'use strict';

let divsService = require('../service/divs');
let divsSummary = require('../adapter/divsSummary');
let InvalidRequestError = require('../model/errors').InvalidRequestError;

module.exports = function divs(params) {
  let year = params.year;

  if (!year) {
    throw new InvalidRequestError('You must specify a year.');
  }

  return divsService.getDivsByYear(year)
    .then(divsSummary);
}
