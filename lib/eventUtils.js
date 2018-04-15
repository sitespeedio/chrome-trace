'use strict';

module.exports = {
  getThreadId({ pid, tid }) {
    return `${pid}:${tid}`;
  }
};
