'use strict'

// Custom error type for expected errors (logging will be simplified for those)
class ObserveError extends Error {
  constructor(message) {
    super(message);
    this._liberror = true;
  }
}

module.exports = ObserveError;
