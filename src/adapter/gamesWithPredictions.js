'use strict';

let predictGame = require('./predict.js')

function gamesWithPredictions(args) {
  let teamId = args[0];
  let games = args[1];
  let ratings = args[2];
  return games.map(function(game) {
    game['predictions'] = predictGame(teamId, game.opponent.id, ratings);
    return game;
  });
}

module.exports = gamesWithPredictions;
