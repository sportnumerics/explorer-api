'use strict';

const utils = require('./utils');
const config = require('config');

async function getGames(year, div, date) {
  try {
    const object = await utils.getObject({
      Bucket: process.env.PREDICT_BUCKET_NAME,
      Key: `${year}/divs/${div}/games/${date}.json`
    });

    return JSON.parse(object.Body);
  } catch (e) {
    if (e.code == 'NoSuchKey') {
      return [];
    } else {
      throw e;
    }
  }
}

module.exports = {
  getGames
};
