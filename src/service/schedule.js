'use strict';

const utils = require('./utils');
const _ = require('lodash');
const config = require('config');

async function getSchedulesByYearAndTeamIds(year, teamIds) {
  return await Promise.all(teamIds.map(async id => {
    try {
      const object = await utils.getObject({
        Bucket: process.env.PREDICT_BUCKET_NAME,
        Key: `${year}/teams/${id}.json`
      });

      return JSON.parse(object.Body);
    } catch (e) {
      console.log(`Error while getting team ${id}`, e);
      return null;
    }
  }));
};

async function getSchedulesByYearAndTeamIdsLocal(year, teamIds) {
  const SCHEDULES_DIR = `${config.predictSrcDir}/teams`;

  const fs = require('fs').promises;
  return await Promise.all(teamIds.map(async id => {
    const fileName = `${SCHEDULES_DIR}/${id}.json`;
    console.log(`Getting ${fileName}`);
    try {
      const schedule = await fs.readFile(fileName);
      return JSON.parse(schedule);
    } catch {
      return null;
    }
  }));
}

module.exports = {
  getSchedulesByYearAndTeamIds
};
