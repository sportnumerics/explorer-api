'use strict';
global.Promise = require('bluebird');
let AWS = require('aws-sdk');
let _ = require('lodash');

AWS.config.update({region: process.env['AWS_DEFAULT_REGION']});
const db = Promise.promisifyAll(new AWS.DynamoDB.DocumentClient());

function queryDb(params) {
  return db.queryAsync(params);
}

function batchQueryDb(params) {
  return db.batchGetAsync(params);
}

module.exports = {
  queryDb,
  batchQueryDb
};
