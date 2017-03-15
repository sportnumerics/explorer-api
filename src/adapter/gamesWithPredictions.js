'use strict';

let predictGame = require('./predict.js')

function gamesWithPredictions(args) {
  let teamId = args[0];
  let games = args[1].schedule;
  let ratings = args[2].ratings;
  let meta = args[2].meta;
  games = games.map(function(game) {
    return Object.assign({}, game, {predictions: predictGame(teamId, game.opponent.id, ratings)});
  });
  return { games, meta };
}

module.exports = gamesWithPredictions;
