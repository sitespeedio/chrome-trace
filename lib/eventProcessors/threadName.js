'use strict';

const { getThreadId } = require('../eventUtils');

module.exports = function createProcessor() {
  const threadName = {};
  return {
    processEvent(event) {
      if (!('M' === event.ph && 'thread_name' === event.name)) {
        return;
      }
      threadName[getThreadId(event)] = event.args.name;
    },
    getResult() {
      return { threadName };
    }
  };
};
