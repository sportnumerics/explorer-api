'use strict';

let predictGame = require('./predict');
let utils = require('./utils');

function gamesWithPredictions(args) {
  let teamId = args[0];
  let games = args[1].data.schedule;
  let ratings = args[2].data.ratings;
  let meta = args[2].meta;
  let schedule = games.map(function(game) {
    return Object.assign({}, game, {predictions: predictGame(teamId, game.opponent.id, ratings)});
  });
  let body = { schedule };
  let headers = utils.headers(meta);
  return { body, headers }
}

module.exports = gamesWithPredictions;
