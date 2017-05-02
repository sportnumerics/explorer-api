'use strict';

let predictGame = require('./predict');
let utils = require('./utils');
let _ = require('lodash');
let ratingsSummary = require('./ratingsSummary');

function gamesWithPredictions({ teamId, scheduleRes, ratingsRes, teamsRes }) {
  let games = scheduleRes.data.schedule;
  let ratings = ratingsRes.data.ratings;
  let teamInfo = _.find(teamsRes.data.teams, (team) => team.id == teamId);
  let teamRatings = { ratings: ratingsSummary(ratings[teamId]) };
  let team = Object.assign({}, teamInfo, teamRatings);
  let schedule = games.map(function(game) {
    return Object.assign({}, game, {
      predictions: predictGame(teamId, game.opponent.id, ratings)
    });
  });
  let body = { schedule, team };
  let headers = utils.headers(ratingsRes.meta);
  return { body, headers }
}

module.exports = gamesWithPredictions;
