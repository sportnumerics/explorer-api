'use strict';

module.exports = function predict(teamRating, opponentRating) {
  if (opponentRating && teamRating) {
    let llsGoalsFor = teamRating.offense - opponentRating.defense;
    let llsGoalsAgainst = opponentRating.offense - teamRating.defense;

    return {
      llsGoalsFor: llsGoalsFor,
      llsGoalsAgainst: llsGoalsAgainst
    };
  } else {
    return null;
  }
}
