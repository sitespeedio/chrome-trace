'use strict';

module.exports = {
  getThreadId(process, thread) {
    return `${process}:${thread}`;
  },
  async streamToString(stream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', chunk => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
};
