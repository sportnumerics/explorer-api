'use strict';

let config = require('config').get('divs');
let utils = require('./utils');

const TABLE = process.env.DIVS_TABLE_NAME

function getDivsByYear(year) {
  return utils.queryDb({
    TableName: TABLE,
    KeyConditionExpression: 'season = :season',
    ExpressionAttributeValues: {
      ':season': year
    }
  }).then(data => {
    return data.Items[0];
  });
}

module.exports = {
  getDivsByYear
};
