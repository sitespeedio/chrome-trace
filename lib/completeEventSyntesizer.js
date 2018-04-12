'use strict';

const { getThreadId } = require('./util');

module.exports = {
  createEventSyntesizer() {
    const eventsPerThread = {};
    return {
      processBeginEvent(beginEvent) {
        const threadId = getThreadId(beginEvent.pid, beginEvent.tid);
        const perThread = eventsPerThread[threadId] || [];
        perThread.push(beginEvent);
        eventsPerThread[threadId] = perThread;
      },
      processEndEvent(endEvent) {
        const threadId = getThreadId(endEvent.pid, endEvent.tid);
        const perThread = eventsPerThread[threadId];
        const beginEvent = perThread.pop();

        const dur = endEvent.ts - beginEvent.ts;

        if (dur < 0) {
          throw new Error(`Incorrect event order for thread: ${threadId}`);
        }

        const args = Object.assign({}, beginEvent.args, endEvent.args);

        return Object.assign({}, beginEvent, endEvent, {
          ph: 'X',
          args,
          dur,
          ts: beginEvent.ts
        });
      },
      getStartedEvents() {
        return eventsPerThread;
      }
    };
  }
};
