'use strict';

let predictGame = require('./predict');
let utils = require('./utils');
let _ = require('lodash');
let ratingsSummary = require('./ratingsSummary');
let recordSummary = require('./recordSummary');

function teamSummary({ teamRes, opponentsRes }) {
  let teamObj = teamRes[0];
  let games = teamObj.schedule;
  let teamInfo = teamObj.team;
  let ratings = teamObj.ratings;
  let teamRatings = { ratings: ratingsSummary(ratings) };
  let teamRecord = { record: recordSummary(games) };
  let team = Object.assign({}, teamInfo, teamRatings, teamRecord);
  let schedule = games.map(function(game) {
    const opponentRatings = _.find(opponentsRes, { id: game.opponent.id }).ratings;
    return Object.assign({}, game, {
      predictions: predictGame(ratings, opponentRatings)
    });
  });
  let body = Object.assign({}, team, { schedule });
  
  let lastModified = utils.ratingsTimestamp(ratings);
  let headers = utils.headers({ lastModified });
  return { body, headers }
}

module.exports = teamSummary;
