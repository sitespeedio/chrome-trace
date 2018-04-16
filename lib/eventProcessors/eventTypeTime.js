'use strict';

const durationProcessor = require('./durationEvents/durationProcessor');

const eventName = event => event.name;

module.exports = function createProcessor() {
  return durationProcessor('eventTypeTime', eventName);
};
