'use strict';

require('es6-promise').polyfill();
let getRatings = require('../service/ratings'),
  getTeams = require('../service/teams'),
  joinTeamsWithRatings = require('../adapter/teamsWithRatings');

module.exports = function teams(req, res) {
  Promise.all([getTeams(), getRatings()])
    .then(joinTeamsWithRatings)
    .then(teams => {
      res.json({teams})
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({error:"Internal Server Error"});
    });
};
