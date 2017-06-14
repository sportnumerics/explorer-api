'use strict';

let divsService = require('../service/divs');
let InvalidRequestError = require('../model/errors').InvalidRequestError;
let utils = require('../adapter/utils');

module.exports = function divs(params) {
  let year = params.year;

  if (!year) {
    throw new InvalidRequestError('You must specify a year.');
  }

  return divsService.getDivsByYear(year)
    .then((result) => {
      let divisions = result.divisions;
      let body = { divisions };
      let headers = utils.headers({ lastModified: utils.defaultDate() });
      return { body, headers };
    });
}
