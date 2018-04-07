'use strict';

const mainThread = require('./mainThread');
const threadName = require('./threadName');
const cpuTimePerThread = require('./cpuTimePerThread');
const cpuEventsPerThread = require('./cpuEventsPerThread');
const cpuCategoriesPerThread = require('./cpuCategoriesPerThread');

module.exports = {
  createProcessors(options = {}) {
    return [
      mainThread(options),
      threadName(options),
      cpuTimePerThread(options),
      cpuEventsPerThread(options),
      cpuCategoriesPerThread(options)
    ];
  }
};
