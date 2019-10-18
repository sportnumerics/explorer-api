'use strict';
global.Promise = require('bluebird');
let AWS = require('aws-sdk');
let _ = require('lodash');

AWS.config.update({ region: process.env['AWS_DEFAULT_REGION'] });
const s3 = new AWS.S3();

function getObject(params) {
  return s3.getObject(params).promise();
}

module.exports = {
  getObject
};
