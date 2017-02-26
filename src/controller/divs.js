'use strict';

let getDivs = require('../service/divs');

module.exports = function divs() {
  return getDivs().then(divisions => {
    return {divisions}
  });
}
