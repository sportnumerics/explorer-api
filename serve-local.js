'use strict';

const express = require('express'),
  yaml = require('js-yaml'),
  fs = require('fs'),
  _ = require('lodash'),
  config = require('config');
let app = express();

let port = 3000;

if (config.mocks) {
  for (const mockPath in config.mocks) {
    console.log(`Adding path ${mockPath}`);
    app.get(mockPath, (req, res) => {
      res.status(200);
      res.header('Content-Type', 'application/json');
      res.header('Access-Control-Allow-Origin', '*');
      const m = require(config.mocks[mockPath]);
      const data = typeof m === 'function' ?
        m({ lastModified: new Date(), expires: new Date() }) :
        m;
      res.set(data.headers);
      res.send(JSON.stringify(data.body));
    });
  }
} else {
  addHandlersForServerlessConfig('serverless.yml', app);
}

function addHandlersForServerlessConfig(fileName, app) {
  let serverlessConfig = yaml.safeLoad(fs.readFileSync(fileName));

  _(serverlessConfig.functions)
    .values()
    .filter(httpFunction)
    .value()
    .forEach(f => {
      let slsHandler = getHandler(f.handler);
      let handler = expressifyHandler(slsHandler);

      _(f.events)
        .filter(httpEvent)
        .value()
        .forEach(e => {
          let http = e.http;
          let path = expressifyPath(http.path);

          let method = http.method;
          if (method == 'get') {
            console.log(`Adding handler for route ${path}`);
            app.get(path, handler)
          } else {
            console.log(`WARNING: Unsupported method ${method}`);
          }
        });
    });
  }

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
  return _.some(f.events, httpEvent)
}

function httpEvent(e) {
  return _.has(e, 'http');
}

app.listen(port);

console.log(`Listening on ${port}`)
