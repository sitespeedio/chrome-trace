'use strict';

const { createEventSyntesizer } = require('../completeEventSyntesizer');
const { getThreadId, round } = require('../eventUtils');

module.exports = function createAnalyzer() {
  const eventSyntesizer = createEventSyntesizer();
  const eventsPerThread = {};

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
          const events = eventsPerThread[threadId] || {};
          let timePerEvent = events[event.name] || 0;
          timePerEvent += (event.dur || 0) / 1e3; // some X events lack duration
          events[event.name] = timePerEvent;
          eventsPerThread[threadId] = events;
        }
      }
    },
    getResult() {
      return { cpuEventsPerThread: eventsPerThread };
    }
  };
};
