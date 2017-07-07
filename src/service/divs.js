'use strict';

let utils = require('./utils');

const TABLE = process.env.DIVS_TABLE_NAME

function getDivsByYear(year) {
  return utils.queryDb({
    TableName: TABLE,
    KeyConditionExpression: '#year = :year',
    ExpressionAttributeValues: {
      ':year': year
    },
    ExpressionAttributeNames: {
      '#year': 'year'
    }
  }).then(data => {
    return data.Items[0];
  });
}

module.exports = {
  getDivsByYear
};
