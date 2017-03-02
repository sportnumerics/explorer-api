'use strict';

global.Promise = require('bluebird');
require('isomorphic-fetch');

let config = require('config').get('teams');

module.exports = function getScheduleFromStatsService(year, teamId) {
  let url = `${config.baseUrl}/year/${year}/teams/${teamId}/schedule`;
  console.log(`Fetching ${url}`);
  return fetch(url).then(function(response) {
    if (response.status >= 400) {
      throw new Error('Unable to get teams from stats service.');
    }
    return response.json();
  }).then(function(json) {
    return json.schedule;
  });
};
