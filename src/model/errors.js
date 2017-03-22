'use strict';

function NotFoundError(message) {
  this.name = 'NotFoundError';
  this.message = message || 'The resource was not found';
  this.stack = (new Error()).stack;
  this.statusCode = 404;
}
NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

function InvalidRequestError(message) {
  this.name = 'InvalidRequestError';
  this.message = message || 'The request was invalid';
  this.stack = (new Error()).stack;
  this.statusCode = 400;
}
InvalidRequestError.prototype = Object.create(Error.prototype);
InvalidRequestError.prototype.constructor = InvalidRequestError;

module.exports = {
  NotFoundError,
  InvalidRequestError
}
