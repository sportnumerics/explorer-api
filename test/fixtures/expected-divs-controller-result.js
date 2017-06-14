'use strict';

module.exports = ({lastModified, expires}) => ({
    "body": {
        "divisions": [
            {
                "id": "1",
                "title": "NCAA Division 1"
            },
            {
                "id": "2",
                "title": "NCAA Division 2"
            },
            {
                "id": "3",
                "title": "NCAA Division 3"
            }
        ]
    },
    "headers": {
        "Expires": expires,
        "Last-Modified": lastModified
    }
})