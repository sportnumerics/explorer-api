'use strict';

let math = require('mathjs');

module.exports = function predict(teamId, opponentId, ratings) {
  let teamRating = ratings[teamId];
  let opponentRating = ratings[opponentId];

  let llsGoalsFor = teamRating.offense - opponentRating.defense;
  let llsGoalsAgainst = opponentRating.offense - teamRating.defense;
  let pcdGoalsFor = llsGoalsFor + math.dot(teamRating.pcdOffense, opponentRating.pcdDefense);
  let pcdGoalsAgainst = llsGoalsAgainst + math.dot(opponentRating.pcdOffense, teamRating.pcdDefense);

  return {
    llsGoalsFor: math.round(llsGoalsFor),
    llsGoalsAgainst: math.round(llsGoalsAgainst),
    pcdGoalsFor: math.round(pcdGoalsFor),
    pcdGoalsAgainst: math.round(pcdGoalsAgainst)
  };
}
