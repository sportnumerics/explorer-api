'use strict';

global.Promise = require('bluebird');
require('isomorphic-fetch');
let config = require('config').get('teams');

module.exports = function getTeamsFromStatsService(year, div) {
  let url = `${config.baseUrl}/years/${year}/divs/${div}/teams`;
  console.log(`Fetching ${url}`);
  return fetch(url).then(function(response) {
    if (response.status >= 400) {
      throw new Error('Unable to get teams from stats service.');
    }
    return response.json();
  }).then(function(json) {
    return json.teams;
  });
};
