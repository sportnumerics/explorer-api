'use strict';

let divsController = require('./src/controller/divs'),
  scheduleController = require('./src/controller/schedule'),
  teamsController = require('./src/controller/teams'),
  gamesController = require('./src/controller/games'),
  errors = require('./src/model/errors'),
  config = require('config');

function handleify(f) {
  return (event, context, callback) => {
    f(Object.assign({}, event.pathParameters))
      .then(createSuccessResponse)
      .catch(createErrorResponse)
      .then(result => callback(null, result))
      .catch(err => callback(err));
  };
}

function createSuccessResponse(response) {
  response = response || {};
  return {
    statusCode: 200,
    headers: Object.assign({}, response.headers, {
      'Access-Control-Allow-Origin': config.allowedOrigins
    }),
    body: JSON.stringify(response.body)
  };
}

function createErrorResponse(error) {
  error = error || {};
  console.log(`Got error`, error);
  return {
    statusCode: error.statusCode || 500,
    body: createErrorBody(error),
    headers: {
      'Access-Control-Allow-Origin': config.allowedOrigins
    }
  };
}

function createErrorBody(error) {
  let prod = /^prod/.test(process.env.NODE_ENV);
  let message = error.message;
  let stack = prod ? error.stack : undefined;
  return JSON.stringify({ message, stack });
}

module.exports = {
  handleify,
  divs: handleify(divsController),
  schedule: handleify(scheduleController),
  teams: handleify(teamsController),
  games: handleify(gamesController)
};
