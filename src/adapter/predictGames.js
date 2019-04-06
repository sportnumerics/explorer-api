const predict = require('./predict');

module.exports = function addPredictionToGames(games) {
  return games.map(game => {
    const predictions = predict(
      game.team.ratings,
      game.opponent.ratings,
      game.location
    );
    return Object.assign({}, game, { predictions });
  });
};
