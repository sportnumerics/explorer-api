'use strict';

module.exports = ({lastModified, expires} = {}) => ({
  "body": {
    "divisions": [
      {
        "id": "m1",
        "sport": "mla",
        "title": "NCAA Men's Division 1"
      },
      {
        "id": "m2",
        "sport": "mla",
        "title": "NCAA Men's Division 2"
      },
      {
        "id": "m3",
        "sport": "mla",
        "title": "NCAA Men's Division 3"
      },
      {
        "id": "w1",
        "sport": "wla",
        "title": "NCAA Women's Division 1"
      },
      {
        "id": "w2",
        "sport": "wla",
        "title": "NCAA Women's Division 2"
      },
      {
        "id": "w3",
        "sport": "wla",
        "title": "NCAA Women's Division 3"
      }
    ]
  },
  "headers": {
    "Expires": expires,
    "Last-Modified": lastModified
  }
})