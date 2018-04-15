'use strict';

const { createProcessors } = require('./lib/eventProcessors');

async function streamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
}

module.exports = {
  async parseStream(input, options = {}) {
    const json = JSON.parse(await streamToString(input));
    return this.parseObject(json, options);
  },
  parseObject(input, options = {}) {
    const processors = createProcessors(options);

    for (const event of input.traceEvents) {
      processors.map(processor => processor.processEvent(event));
    }

    return processors.reduce(
      (result, processor) => Object.assign(result, processor.getResult()),
      {}
    );
  }
};
