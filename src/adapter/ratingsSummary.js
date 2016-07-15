'use strict';

function ratingsSummary(teamRatings) {
  return {
    pcdOffense: teamRatings.pcdOffense,
    pcdDefense: teamRatings.pcdDefense,
    offense: teamRatings.offense,
    defense: teamRatings.defense,
    overall: teamRatings.overall
  };
};

module.exports = ratingsSummary;
