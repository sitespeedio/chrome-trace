'use strict';

module.exports = {
  getThreadId({ pid, tid }) {
    return `${pid}:${tid}`;
  },
  round(num, decimals = 3) {
    const pow = Math.pow(10, decimals);
    return Math.round(num * pow) / pow;
  }
};
