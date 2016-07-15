'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');

let baseUrl = 'http://localhost:3000/teams';

module.exports = function getTeamsFromStatsService() {
  return fetch(baseUrl).then(function(response) {
    if (response.status >= 400) {
      throw new Error('Unable to get teams from stats service.');
    }
    return response.json();
  }).then(function(json) {
    return json.teams;
  });
};
