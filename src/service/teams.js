'use strict';

let utils = require('./utils');
let fs = require('fs');

const TABLE = process.env.TEAMS_TABLE_NAME;

function getTeamsByYearAndDiv(year, div) {
  return utils.queryDb({
    TableName: TABLE,
    IndexName: 'schedule',
    KeyConditionExpression: 'season = :season and div = :div',
    ExpressionAttributeValues: {
      ':season': year,
      ':div': div
    }
  }).then(data => {
    return data.Items;
  });
};

module.exports = {
  getTeamsByYearAndDiv
};
