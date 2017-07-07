'use strict';

const utils = require('./utils');

function divsSummary(result)  {
  let divisions = result;
  let body = { divisions };
  const lastModified = utils.defaultDate();
  let headers = utils.headers({ lastModified });
  return { body, headers };
}

module.exports = divsSummary;
