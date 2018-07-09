'use strict';
global.Promise = require('bluebird');
let AWS = require('aws-sdk');
let _ = require('lodash');

AWS.config.update({region: process.env['AWS_DEFAULT_REGION']});
const s3 = Promise.promisifyAll(new AWS.S3());

function getObject(params) {
  return s3.getObjectAsync(params);
}

module.exports = {
  getObject
};
