'use strict';

const controller = require('../../src/controller/divs');
const divsService = require('../../src/service/divs');
const utils = require('../../src/adapter/utils');
const fixtures = require('../fixtures');
const sinon = require('sinon');

describe('divs controller', () => {
  let divsMock, utilsMock;

  it('should return divisions from the divs service', () => {
    let year = '2017';
    let mockDate = 'Tue, 18 Apr 2017 11:45:11 GMT';
    let mockExpires = 'Wed, 19 Apr 2017 11:45:11 GMT';

    divsMock = sinon.mock(divsService);

    divsMock.expects('getDivsByYear')
      .withArgs(year)
      .returns(Promise.resolve(fixtures.divsJson));

    utilsMock = sinon.mock(utils);

    utilsMock.expects('defaultDate')
      .returns(new Date(mockDate));

    return controller({ year })
      .then((result) => {
        expect(result).to.deep.equal(fixtures.expectedDivsControllerResult({
          lastModified: mockDate,
          expires: mockExpires
        }))
        divsMock.verify();
      })
  });

  afterEach(() => {
    divsMock.restore();
  })
});
