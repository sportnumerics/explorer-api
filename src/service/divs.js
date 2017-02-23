'use strict';

global.Promise = require('bluebird');
require('isomorphic-fetch');
let config = require('config').get('teams');

module.exports = function getDivsFromStatsService() {
  let url = `${config.baseUrl}${config.divs}`;
  console.log(`Fetching ${url}`);
  return fetch(url).then(function(response) {
    if (response.status >= 400) {
      throw new Error('Unable to get divisions from stats service.');
    }
    return response.json();
  }).then(function(json) {
    return json.divisions;
  });
}
