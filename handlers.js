'use strict';

let divsController = require('./src/controller/divs'),
  scheduleController = require('./src/controller/schedule'),
  teamsController = require('./src/controller/teams');

function handleify(f) {
  return (event, context, callback) => {
    console.log(`Entering function`, event, context);
    f(Object.assign({}, event.pathParameters)).then((response) => {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(response)
      };
    }).catch((error) => {
      console.log(`Got error`, error);
      return {
        statusCode: 500,
        body: JSON.stringify({message: error.message, stack: error.stack})
      };
    }).asCallback(callback);
  }
}

module.exports = {
  divs: handleify(divsController),
  schedule: handleify(scheduleController),
  teams: handleify(teamsController)
};
