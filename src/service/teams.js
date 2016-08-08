'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');

let baseUrl = require('config').get('teams.baseUrl');

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
