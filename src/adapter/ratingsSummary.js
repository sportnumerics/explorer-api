'use strict';

function ratingsSummary(teamRatings) {
  if (teamRatings) {
    return {
      offense: teamRatings.offense,
      defense: teamRatings.defense,
      overall: teamRatings.overall
    };
  } else {
    return null;
  }
};

module.exports = ratingsSummary;
