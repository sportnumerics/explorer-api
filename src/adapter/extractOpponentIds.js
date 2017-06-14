'use strict';

function extractOpponentIds(teamRes) {
  const team = teamRes[0];
  const opponentIds = team.schedule.map(game => game.opponent.id);
  return {
    teamRes,
    opponentIds
  };
}

module.exports = extractOpponentIds