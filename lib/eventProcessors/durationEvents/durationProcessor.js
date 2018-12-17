'use strict';

const { createEventSyntesizer } = require('./completeEventSyntesizer');
const { getThreadId, round } = require('../../eventUtils');

function isIgnored(event) {
  const isInvalid = () => !event.name;
  const isTopLevel = () => (event.cat || '').includes('toplevel');
  const isIgnoredType = () =>
    [
      'Decode LazyPixelRef',
      'PaintImage',
      'UpdateLayer',
      'ImageDecodeTask',
      'LatencyInfo.Flow',
      'PlatformResourceSendRequest',
      'CommitLoad'
    ].includes(event.name);

  return isInvalid() || isTopLevel() || isIgnoredType();
}

function isChildEvent(previous, current) {
  if (!previous) {
    return false;
  }
  return current.ts < previous.ts + previous.dur;
}

function findParentEvents(eventStack, event) {
  const parentStack = [];
  for (const previousEvent of eventStack) {
    if (isChildEvent(previousEvent, event)) {
      parentStack.push(previousEvent);
    } else {
      break;
    }
  }
  return parentStack;
}

function roundAndFilter(timePerType) {
  const entries = Object.entries(timePerType);

  return entries.reduce((result, [type, time]) => {
    const rounded = round(time / 1e3, 3);
    if (rounded > 0) {
      result[type] = rounded;
    }
    return result;
  }, {});
}

module.exports = function createProcessor(name, keyFromEvent) {
  const eventSyntesizer = createEventSyntesizer();
  const eventsPerThread = {};

  return {
    processEvent(event) {
      if (isIgnored(event)) {
        return;
      }

      switch (event.ph) {
        case 'B':
          return eventSyntesizer.processBeginEvent(event);
        case 'E':
          event = eventSyntesizer.processEndEvent(event);
        // eslint-disable-next-line no-fallthrough
        case 'X': {
          event.dur = event.dur || 0;
          const threadId = getThreadId(event);
          const events = eventsPerThread[threadId] || [];
          events.push(event);
          eventsPerThread[threadId] = events;
        }
      }
    },
    getResult: function() {
      const timePerThread = {};

      for (const [threadId, events] of Object.entries(eventsPerThread)) {
        const sortedEvents = events.sort((a, b) => a.ts - b.ts);

        let eventStack = [];

        const timePerType = sortedEvents.reduce((result, event) => {
          result[keyFromEvent(event)] =
            (result[keyFromEvent(event)] || 0) + event.dur;

          eventStack = findParentEvents(eventStack, event);

          const previousEvent = eventStack.pop();
          if (isChildEvent(previousEvent, event)) {
            eventStack.push(previousEvent);
            result[keyFromEvent(previousEvent)] -= event.dur;
          }
          eventStack.push(event);

          return result;
        }, {});

        timePerThread[threadId] = roundAndFilter(timePerType);
      }

      const result = {};
      result[name] = timePerThread;

      return result;
    }
  };
};
