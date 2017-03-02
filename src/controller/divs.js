'use strict';

let getDivs = require('../service/divs');

module.exports = function divs(params) {
  let year = params.year;

  return getDivs(year).then(divisions => {
    return {divisions}
  });
}
