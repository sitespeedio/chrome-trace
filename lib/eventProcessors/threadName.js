'use strict';

const { getThreadId } = require('../util');

module.exports = function createAnalyzer() {
  const threadName = {};
  return {
    processEvent(event) {
      if (!('M' === event.ph && 'thread_name' === event.name)) {
        return;
      }
      threadName[getThreadId(event.pid, event.tid)] = event.args.name;
    },
    getResult() {
      return { threadName };
    }
  };
};
