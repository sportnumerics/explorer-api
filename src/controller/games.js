'use strict';

global.Promise = require('bluebird');
const _ = require('lodash');
const utils = require('../adapter/utils');
const gamesService = require('../service/games');

module.exports = async function gamesController(params) {
  const year = params.year;
  const div = params.div;
  const date = params.date;

  if (!year) {
    throw new InvalidRequestError('You must specify a year.');
  }

  if (!div) {
    throw new InvalidRequestError('You must specify a division');
  }

  if (!date) {
    throw new InvalidRequestError(
      'You must specify a date (YYYY-MM-DD format)'
    );
  }

  const games = await gamesService.getGames(year, div, date);

  const lastModified = utils.ratingsTimestamp(getFirstRatings(games));

  let body = { games };
  let headers = utils.headers({ lastModified });
  return { body, headers };
};

function getFirstRatings(games) {
  const firstTeam = _(games)
    .flatMap(g => [g.team, g.opponent])
    .filter('ratings')
    .head();
  if (firstTeam) {
    return firstTeam.ratings;
  } else {
    return {};
  }
}
