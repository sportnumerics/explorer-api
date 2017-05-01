'use strict';
global.Promise = require('bluebird');
let AWS = require('aws-sdk');
let NotFoundError = require('../model/errors').NotFoundError;
let _ = require('lodash');
let config = require('config');
let path = require('path');

function parseS3Data(s3data) {
  let data = JSON.parse(s3data.Body);
  let meta = {
    lastModified: new Date(s3data.LastModified)
  };

  return { data, meta }
}

function handleError(error) {
  if (error.code === 'NoSuchKey') {
    return new NotFoundError();
  } else {
    return error;
  }
}

function fetchFromS3(bucket, key) {
  return new Promise((resolve, reject) => {
    let s3 = new AWS.S3();
    console.log(`Fetching object ${key} from ${bucket}`);
    s3.getObject({Bucket: bucket, Key: key}, (err, data) => {
      if (err) {
        reject(handleError(err));
      } else {
        resolve(parseS3Data(data));
      }
    });
  });
}

function fetchFromMocks(bucket, key) {
  return new Promise((resolve, reject) => {
    let mockSrc = _(config.mocks)
      .pick((src, test) => key.match(test))
      .values().first();
    if (mockSrc) {
      let src = path.join('../../', mockSrc);
      let object = require(src);
      console.log(`Resolving S3 key ${key} with local object: ${mockSrc}`);
      resolve(object);
    } else {
      reject(new NotFoundError());
    }
  });
}

function shouldUseMocks() {
  return process.env.NODE_ENV === 'local'
}

module.exports = {
  fetchFromS3: shouldUseMocks() ? fetchFromMocks : fetchFromS3
};
