'use strict';

let utils = require('./utils');
let fs = require('fs');

const TABLE = process.env.TEAMS_TABLE_NAME;

function getTeamsByYearAndDiv(year, div) {
  return utils.queryDb({
    TableName: TABLE,
    IndexName: 'schedule',
    KeyConditionExpression: '#year = :year and div = :div',
    ExpressionAttributeValues: {
      ':year': year,
      ':div': div
    },
    ExpressionAttributeNames: {
      '#year': 'year'
    }
  }).then(data => {
    return data.Items;
  });
};

module.exports = {
  getTeamsByYearAndDiv
};
