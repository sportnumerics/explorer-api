'use strict';

let divsService = require('../service/divs');
let InvalidRequestError = require('../model/errors').InvalidRequestError;

module.exports = function divs(params) {
  let year = params.year;

  if (!year) {
    throw new InvalidRequestError('You must specify a year.');
  }

  return divsService.getDivsByYear(year)
    .then((result) => {
      let divisions = result.divisions;
      let body = { divisions };
      let headers = { 'Last-Modified': result.meta.lastModified };
      return { body, headers };
    });
}
