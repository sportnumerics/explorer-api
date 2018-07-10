'use strict';

let utils = require('./utils');
const config = require('config')

async function getTeamsByYearAndDiv(year, div) {
  const object = await utils.getObject({
    Bucket: process.env.PREDICT_BUCKET_NAME,
    Key: `${year}/divs/${div}`
  });

  return JSON.parse(object.Body);
};

async function getTeamsByYearAndDivLocal(year, div) {
  const fs = require('fs').promises;
  const fileName = `${config.predictSrcDir}/divs/${div}.json`;
  console.log(`Getting ${fileName}`);
  const teams = await fs.readFile(fileName);
return JSON.parse(teams);
}

module.exports = {
  getTeamsByYearAndDiv
};
