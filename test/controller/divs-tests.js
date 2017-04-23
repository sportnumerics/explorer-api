'use strict';

const controller = require('../../src/controller/divs');
const divsService = require('../../src/service/divs');
const fixtures = require('../fixtures');
const sinon = require('sinon');

describe('divs controller', () => {
  let divsMock;

  it('should return divisions from the divs service', () => {
    let year = '2017';

    divsMock = sinon.mock(divsService);

    divsMock.expects('getDivsByYear')
      .withArgs(year)
      .returns(Promise.resolve(fixtures.divsJson));

    return controller({ year })
      .then((result) => {
        expect(result).to.deep.equal(fixtures.expectedDivsControllerResult)
        divsMock.verify();
      })
  });

  afterEach(() => {
    divsMock.restore();
  })
});
