'use strict';

const { getThreadId } = require('../util');

module.exports = function createAnalyzer() {
  let mainThread;
  return {
    processEvent(event) {
      if (mainThread || !['X', 'I'].includes(event.ph)) {
        return;
      }
      const args = Object.assign({ data: {} }, event.args);
      if (args.data.isMainFrame === true) {
        mainThread = getThreadId(event);
      }
    },
    getResult() {
      return { mainThread };
    }
  };
};
