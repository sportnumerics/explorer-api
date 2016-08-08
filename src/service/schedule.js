'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');

let baseUrl = require('config').get('schedule.baseUrl');

module.exports = function getScheduleFromStatsService(teamId) {
  let url = baseUrl + '/' + teamId + '/schedule';
  return fetch(url).then(function(response) {
    if (response.status >= 400) {
      throw new Error('Unable to get teams from stats service.');
    }
    return response.json();
  }).then(function(json) {
    return json.schedule;
  });
};
