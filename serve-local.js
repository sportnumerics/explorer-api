'use strict';

const express = require('express'),
  yaml = require('js-yaml'),
  fs = require('fs'),
  _ = require('lodash');
let app = express();

let port = 8000;

let serverlessConfig = yaml.safeLoad(fs.readFileSync('serverless.yml'));

_(serverlessConfig.functions)
  .values()
  .filter(httpFunction)
  .each(f => {
    let slsHandler = getHandler(f.handler);
    let handler = expressifyHandler(slsHandler);

    _(f.events)
      .filter(httpEvent)
      .each(e => {
        let http = e.http;
        let path = expressifyPath(http.path);

        let method = http.method;
        if (method == 'get') {
          console.log(`Adding handler for route ${path}`);
          app.get(path, handler)
        } else {
          console.log(`WARNING: Unsupported method ${method}`);
        }
      }).value();
  }).value();


function getHandler(string) {
  let parts = string.split('.');
  let file = parts[0];
  let path = `./${file}`;
  let module = require(path);
  return parts.slice(1).reduce((m, part) => {
    return m[part];
  }, module);
}

function expressifyPath(path) {
  // cheap cheat for now
  return '/' + path.replace(/\{/g, ':').replace(/\}/g,'');
}

function expressifyHandler(handler) {
  return (req, res) => {
    let event = createEventFromRequest(req);
    let context = {};
    handler(event, context, expressifyResponse(res));
  };
}

function createEventFromRequest(req) {
  return {
    pathParameters: req.params
  }
}

function expressifyResponse(res) {
  return (err, response) => {
    res.status(response.statusCode);
    res.set(response.headers);
    res.header('Content-Type', 'application/json');
    res.send(new Buffer(response.body));
  };
}

function httpFunction(f) {
  return _.any(f.events, httpEvent)
}

function httpEvent(e) {
  return _.has(e, 'http');
}

app.listen(port);

console.log(`Listening on ${port}`)
