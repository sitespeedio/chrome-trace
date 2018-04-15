'use strict';

const mainThread = require('./mainThread');
const threadName = require('./threadName');
const cpuEventsPerThread = require('./cpuEventsPerThread');
const cpuCategoriesPerThread = require('./cpuCategoriesPerThread');

module.exports = {
  createProcessors(options = {}) {
    return [
      mainThread(options),
      threadName(options),
      cpuEventsPerThread(options),
      cpuCategoriesPerThread(options)
    ];
  }
};
