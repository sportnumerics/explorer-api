'use strict';

global.Promise = require('bluebird');
const _ = require('lodash');
const utils = require('../adapter/utils');
const gamesService = require('../service/games');
const predictGames = require('../adapter/predictGames');

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

  if (date) {
    return await getGames(year, div, date);
  } else {
    return await getIndex(year, div);
  }
};

async function getIndex(year, div) {
  const games = await gamesService.getGames(year, div, 'index');

  return { body: { games } };
}

async function getGames(year, div, date) {
  const games = predictGames(await gamesService.getGames(year, div, date));

  const lastModified = utils.ratingsTimestamp(getFirstRatings(games));

  const body = { games };
  const headers = utils.headers({ lastModified });
  return { body, headers };
}

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
