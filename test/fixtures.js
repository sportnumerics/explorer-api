'use strict';

let fs = require('fs'),
  path = require('path'),
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised);
global.expect = chai.expect;

module.exports = {
  ratingsJson: require('./fixtures/ratings'),
  scheduleJson: require('./fixtures/schedule'),
  teamsJson: require('./fixtures/teams'),
  expectedScheduleControllerResult: require('./fixtures/expected-schedule-controller-result'),
  expectedTeamsControllerResult: require('./fixtures/expected-teams-controller-result')
};
