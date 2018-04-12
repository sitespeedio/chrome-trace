'use strict';

const { createEventSyntesizer } = require('../completeEventSyntesizer');
const { getThreadId } = require('../util');

module.exports = function createAnalyzer() {
  const eventSyntesizer = createEventSyntesizer();
  const cpuPerThread = {};

  return {
    processEvent(event) {
      switch (event.ph) {
        case 'B':
          return eventSyntesizer.processBeginEvent(event);
        case 'E':
          event = eventSyntesizer.processEndEvent(event);
        // eslint-disable-next-line no-fallthrough
        case 'X': {
          const threadId = getThreadId(event);
          let perThread = cpuPerThread[threadId] || 0;
          perThread += (event.dur || 0) / 1e3; // some X events lack duration
          cpuPerThread[threadId] = perThread;
        }
      }
    },
    getResult() {
      return { cpuPerThread };
    }
  };
};
