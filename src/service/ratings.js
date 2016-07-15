'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');

let baseUrl = 'http://localhost:5000/ratings';

module.exports = function getRatingsFromRatingsService() {
  return fetch(baseUrl).then(function(response) {
    if (response.status >= 400) {
      throw new Error('Unable to get ratings from ratings service.');
    }
    return response.json();
  }).then(function(json) {
    return json.ratings;
  });
};
