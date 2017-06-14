'use strict';

let config = require('config');
let moment = require('moment');

function ratingsTimestamp(ratings) {
  return new Date(ratings.timestamp);
}

function defaultDate() {
  return new Date();
}

function lastModified(meta) {
  return meta.lastModified.toUTCString();
}

function expires(meta) {
  let lastModified = moment(meta.lastModified);
  return lastModified.add(config.timeToLive, 'seconds').toDate().toUTCString();
}

function headers(meta) {
  return {
    'Last-Modified': lastModified(meta),
    'Expires': expires(meta)
  }
}

module.exports = {
  lastModified,
  expires,
  headers,
  ratingsTimestamp,
  defaultDate
}
