'use strict';

function ratingsSummary(teamRatings) {
  return {
    offense: teamRatings.offense,
    defense: teamRatings.defense,
    overall: teamRatings.overall
  };
};

module.exports = ratingsSummary;
