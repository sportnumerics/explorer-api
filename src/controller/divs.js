'use strict';

require('es6-promise').polyfill();
let getDivs = require('../service/divs');

module.exports = function divs() {
  return getDivs().then(divisions => {
    return {divisions}
  });
}
