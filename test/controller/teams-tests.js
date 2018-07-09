'use strict';

const controller = require('../../src/controller/teams');
const teamsService = require('../../src/service/teams');
const fixtures = require('../fixtures');
const sinon = require('sinon');

describe('teams controller', () => {
  let teamsMock;

  it('should join teams from the teams service with ratings from ratings service', () => {
    let year = '2017';
    let div = '1';

    teamsMock = sinon.mock(teamsService);

    teamsMock.expects('getTeamsByYearAndDiv')
      .withArgs(year, div)
      .returns(Promise.resolve(fixtures.divJson));

    return controller({ year, div })
      .then((result) => {
        expect(result).to.deep.equal(fixtures.expectedTeamsControllerResult)
        teamsMock.verify();
      })
  });

  afterEach(() => {
    teamsMock.restore();
  })
});
