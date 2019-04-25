'use strict';

const { getThreadId } = require('../../eventUtils');

module.exports = {
  createEventSyntesizer() {
    const eventsPerThread = {};
    return {
      processBeginEvent(beginEvent) {
        const threadId = getThreadId(beginEvent);
        const perThread = eventsPerThread[threadId] || [];
        perThread.push(beginEvent);
        eventsPerThread[threadId] = perThread;
      },
      processEndEvent(endEvent) {
        const threadId = getThreadId(endEvent);
        let perThread = eventsPerThread[threadId];
        // No matching threads started to happen in Chrome 72 or 73
        // It looks like this_
        // 4034:4041 with threadIds 3572:3572,3572:3598,4034:4034
        // So the first part of the id is probably correct ...
        if (!perThread) {
          const firstPart = threadId.split(':')[0];
          // find the first one that matches the start of the key
          for (let possibleId of Object.keys(eventsPerThread)) {
            if (possibleId.startsWith(firstPart)) {
              perThread = eventsPerThread[possibleId];
            }
          }
          // If we didn't found a match just throw
          if (!perThread) {
            throw new Error(
              `No thread found for threadId: ${threadId} with threadIds ${Object.keys(
                eventsPerThread
              )}`
            );
          }
        }
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
