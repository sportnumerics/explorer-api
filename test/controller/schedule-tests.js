'use strict';

const controller = require('../../src/controller/schedule');
const scheduleService = require('../../src/service/schedule');
const fixtures = require('../fixtures');
const sinon = require('sinon');

describe('schedule controller', () => {
  let scheduleMock;

  it('should get all opponent ratings to calculate predicted scores', () => {
    let year = '2017';
    let id = '721';

    scheduleMock = sinon.mock(scheduleService);

    scheduleMock.expects('getSchedulesByYearAndTeamIds')
      .withArgs(year, [id])
      .returns(Promise.resolve(fixtures.scheduleJson));

    scheduleMock.expects('getSchedulesByYearAndTeamIds')
      .withArgs(year, ['193', '19651'])
      .returns(Promise.resolve(fixtures.batchScheduleJson));

    return controller({ year, id })
      .then((result) => {
        expect(result).to.deep.equal(fixtures.expectedScheduleControllerResult);
        scheduleMock.verify();
      });
  });

  afterEach(() => {
    scheduleMock.restore();
  })
});
