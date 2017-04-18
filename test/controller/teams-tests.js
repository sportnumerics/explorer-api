'use strict';

const controller = require('../../src/controller/teams');
const ratingsService = require('../../src/service/ratings');
const teamsService = require('../../src/service/teams');
const fixtures = require('../fixtures');
const sinon = require('sinon');

describe('teams controller', () => {
  let ratingsMock, teamsMock;

  it('should join teams from the teams service with ratings from ratings service', () => {
    let year = '2017';
    let div = '1';

    ratingsMock = sinon.mock(ratingsService);

    ratingsMock.expects('getRatingsByYearAndDiv')
      .withArgs(year, div)
      .returns(Promise.resolve(fixtures.ratingsJson));

    teamsMock = sinon.mock(teamsService);

    teamsMock.expects('getTeamsByYearAndDiv')
      .withArgs(year, div)
      .returns(Promise.resolve(fixtures.teamsJson));

    return controller({ year, div })
      .then((result) => {
        expect(result).to.deep.equal(fixtures.expectedTeamsControllerResult)
        ratingsMock.verify();
        teamsMock.verify();
      })
  });

  afterEach(() => {
    ratingsMock.restore();
    teamsMock.restore();
  })
});
