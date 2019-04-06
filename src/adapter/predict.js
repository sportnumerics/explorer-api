'use strict';

module.exports = function predict(teamRating, opponentRating, location) {
  if (
    opponentRating &&
    teamRating &&
    teamRating.groupId === opponentRating.groupId
  ) {
    const home = location.type === 'home';
    const hfa = 0;
    const homeTeam = home ? teamRating : opponentRating;
    const awayTeam = home ? opponentRating : teamRating;
    const homeGF = homeTeam.offense - awayTeam.defense + hfa;
    const awayGF = awayTeam.offense - homeTeam.defense - hfa;

    return {
      llsGoalsFor: home ? homeGF : awayGF,
      llsGoalsAgainst: home ? awayGF : homeGF
    };
  } else {
    return null;
  }
};
