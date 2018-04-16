'use strict';

const mainThread = require('./mainThread');
const threadName = require('./threadName');
const cpuEventsPerThread = require('./eventTypeTime');
const cpuCategoriesPerThread = require('./eventCategoryTime');

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
