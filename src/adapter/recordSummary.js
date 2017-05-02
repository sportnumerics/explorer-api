'use strict';

let _ = require('lodash');

function recordSummary(games) {
  if (games) {
    let wins = _.filter(games, isWin).length;
    let losses = _.filter(games, isLoss).length;
    let ties = _.filter(games, isTie).length;
    return {
      wins, losses, ties
    };
  } else {
    return null;
  }
};

function isWin(game) {
  return comparitor(game, (f, a) => f > a);
}

function isLoss(game) {
  return comparitor(game, (f, a) => f < a);
}

function isTie(game) {
  return comparitor(game, (f, a) => f == a);
}

function comparitor(game, predicate) {
  if (game.result) {
    return predicate(game.result.pointsFor, game.result.pointsAgainst);
  } else {
    return false;
  }
}

module.exports = recordSummary;
