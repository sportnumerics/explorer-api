'use strict';

const handleify = require('../../handlers').handleify;

describe('handlify', () => {
  it('should normally return a 200 status code with the embedded headers and body', (done) => {
    const handler = handleify(() => Promise.resolve());

    const event = { pathParameters: {} };

    const context = {};

    handler(event, context, (err, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should return a 500 status code when something goes wrong in the function', (done) => {
    const handler = handleify(() => Promise.reject());

    const event = { pathParameters: {} };

    const context = {};

    handler(event, context, (err, response) => {
      expect(response.statusCode).to.equal(500);
      done();
    });
  });

  it('should add the headers to the response including the access control headers', (done) => {
    const result = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const handler = handleify(() => Promise.resolve(result));

    const event = { pathParameters: {} };

    const context = {};

    handler(event, context, (err, response) => {
      expect(response.headers['Content-Type']).to.equal('application/json');
      expect(response.headers['Access-Control-Allow-Origin']).to.equal('test.origin');
      done();
    });
  });

  it('should stringify the body', (done) => {
    const result = {
      body: {
        foo: 'bar'
      }
    };

    const handler = handleify(() => Promise.resolve(result));

    const event = { pathParameters: {} };

    const context = {};

    handler(event, context, (err, response) => {
      expect(response.body).to.equal('{"foo":"bar"}');
      done();
    });
  })
});
