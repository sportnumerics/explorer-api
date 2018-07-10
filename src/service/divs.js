'use strict';

const utils = require('./utils');
const config = require('config');

async function getDivsByYear(year) {
  const object = await utils.getObject({
    Bucket: process.env.PREDICT_BUCKET_NAME,
    Key: `${year}/divisions.json`
  });

  return JSON.parse(object.Body);
}

async function getDivsByYearLocal(year) {
  const DIVS_FILE = `${config.predictSrcDir}/divisions.json`;

  const fs = require('fs').promises;

  console.log(`Getting ${DIVS_FILE}`);
  const divs = await fs.readFile(DIVS_FILE);

  return JSON.parse(divs);
}

module.exports = {
  getDivsByYear
};
