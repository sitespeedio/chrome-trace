'use strict';

const { name } = require('../../package');
const debug = require('debug')(name);
const { createEventSyntesizer } = require('../completeEventSyntesizer');
const { getThreadId, round } = require('../eventUtils');
const eventCategories = require('../eventCategories');

module.exports = function createAnalyzer() {
  const eventSyntesizer = createEventSyntesizer();
  const categoriesPerThread = {};

  return {
    processEvent(event) {
      if (!event.name) {
        return;
      }
      switch (event.ph) {
        case 'B':
          return eventSyntesizer.processBeginEvent(event);
        case 'E':
          event = eventSyntesizer.processEndEvent(event);
        // eslint-disable-next-line no-fallthrough
        case 'X': {
          const threadId = getThreadId(event);
          const category = eventCategories[event.name];
          if (!category) {
            debug(`Couldn't find category for event ${event.name}`);
            return;
          }

          const categories = categoriesPerThread[threadId] || {};
          let timePerCategory = categories[category] || 0;
          timePerCategory += (event.dur || 0) / 1e3; // some X events lack duration
          categories[category] = timePerCategory;
          categoriesPerThread[threadId] = categories;
        }
      }
    },
    getResult() {
      return { cpuCategoriesPerThread: categoriesPerThread };
    }
  };
};
