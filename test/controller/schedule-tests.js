'use strict';

const controller = require('../../src/controller/schedule');
const ratingsService = require('../../src/service/ratings');
const scheduleService = require('../../src/service/schedule');
const teamsService = require('../../src/service/teams');
const fixtures = require('../fixtures');
const sinon = require('sinon');

describe('schedule controller', () => {
  let ratingsMock, scheduleMock, teamsMock;

  it('should join games from the schedule service with predictions from ratings service', () => {
    let year = '2017';
    let div = '1';
    let id = '721';

    ratingsMock = sinon.mock(ratingsService);

    ratingsMock.expects('getRatingsByYearAndDiv')
      .withArgs(year, div)
      .returns(Promise.resolve(fixtures.ratingsJson));

    scheduleMock = sinon.mock(scheduleService);

    scheduleMock.expects('getScheduleByYearAndTeamId')
      .withArgs(year, id)
      .returns(Promise.resolve(fixtures.scheduleJson));

    teamsMock = sinon.mock(teamsService);

    teamsMock.expects('getTeamsByYearAndDiv')
      .withArgs(year, div)
      .returns(Promise.resolve(fixtures.teamsJson));

    return controller({ year, div, id })
      .then((result) => {
        expect(result).to.deep.equal(fixtures.expectedScheduleControllerResult);
        ratingsMock.verify();
        scheduleMock.verify();
        teamsMock.verify();
      });
  });

  afterEach(() => {
    ratingsMock.restore();
    scheduleMock.restore();
    teamsMock.restore();
  })
});
