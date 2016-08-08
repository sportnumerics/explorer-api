'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');
let AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';

function getRatingsJsonFromRatingsService(config) {
  if (config.method === 's3') {
    return new Promise((resolve, reject) => {
      let s3 = new AWS.S3();
      s3.getObject({Bucket: config.bucket, Key: config.key}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data.Body));
        }
      });
    });
  } else {
    return fetch(config.baseUrl).then(function(response) {
      if (response.status >= 400) {
        throw new Error('Unable to get ratings from ratings service.');
      }
      return response.json();
    });
  }
}

module.exports = function getRatingsFromRatingsService() {
  return getRatingsJsonFromRatingsService(require('config').get('ratings')).then(function(json) {
    return json.ratings;
  });
};
