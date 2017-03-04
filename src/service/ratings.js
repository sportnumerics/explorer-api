'use strict';

global.Promise = require('bluebird');
require('isomorphic-fetch');
let fs = require('fs');
let AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';

function getRatingsJsonFromRatingsService(config, year, div) {
  let uri = `years/${year}/divs/${div}/ratings.json`;

  if (config.method === 's3') {
    return new Promise((resolve, reject) => {
      let s3 = new AWS.S3();
      console.log(`Fetching object ${uri} from ${config.bucket}`);
      s3.getObject({Bucket: config.bucket, Key: uri}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data.Body));
        }
      });
    });
  } else if (config.method === 'fetch') {
    return fetch(uri).then(function(response) {
      if (response.status >= 400) {
        throw new Error('Unable to get ratings from ratings service.');
      }
      return response.json();
    });
  } else if (config.method === 'local') {
    return new Promise(function(resolve, reject) {
      fs.readFile(uri, 'utf-8', function(error, data) {
        if (error) { reject(error); }
        else { resolve(JSON.parse(data)); }
      });
    });
  }
}

module.exports = function getRatingsFromRatingsService(year, div) {
  return getRatingsJsonFromRatingsService(require('config').get('ratings'), year, div)
    .then(function(json) {
      return json.ratings;
    });
};
