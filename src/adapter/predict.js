'use strict';

module.exports = function predict(teamId, opponentId, ratings) {
  let teamRating = ratings[teamId];
  let opponentRating = ratings[opponentId];

  let llsGoalsFor = teamRating.offense - opponentRating.defense;
  let llsGoalsAgainst = opponentRating.offense - teamRating.defense;

  return {
    llsGoalsFor: llsGoalsFor,
    llsGoalsAgainst: llsGoalsAgainst
  };
}
