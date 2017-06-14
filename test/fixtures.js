'use strict';

let fs = require('fs'),
  path = require('path'),
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised);
global.expect = chai.expect;

module.exports = {
  scheduleJson: require('./fixtures/schedule'),
  batchScheduleJson: require('./fixtures/team-193-19651'),
  teamsJson: require('./fixtures/teams'),
  divsJson: require('./fixtures/divs'),
  expectedScheduleControllerResult: require('./fixtures/expected-schedule-controller-result'),
  expectedTeamsControllerResult: require('./fixtures/expected-teams-controller-result'),
  expectedDivsControllerResult: require('./fixtures/expected-divs-controller-result')
};
