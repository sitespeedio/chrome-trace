'use strict';

const mainThread = require('./mainThread');
const threadName = require('./threadName');
const cpuEventsPerThread = require('./eventTypeTime');
const cpuCategoriesPerThread = require('./eventCategoryTime');

module.exports = {
  createProcessors() {
    return [
      mainThread(),
      threadName(),
      cpuEventsPerThread(),
      cpuCategoriesPerThread(),
      cpuCategoriesPerThread('firstPaint')
    ];
  }
};
