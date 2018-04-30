# Chrome-trace

[![Build status][travis-image]][travis-url]

Analyze tracelogs from Chrome, from the command line or as a node.js library.


## How to use

### Command line
With node.js >= 8.9 and npm >= 5.3, use npx to run chrome-trace.
```
npx chrome-trace <trace file>
```

### node.js
Install chrome-trace as a dependency.
```sh
npm i chrome-trace 
```
Pass a stream or a parsed JSON object to chrome-trace.
```javascript
const { parseStream } = require('chrome-trace');

const stream = getReadableStream(); // e.g. stream from file or http response
const parsedTrace = parseStream(stream);

const mainThreadId = parsedTrace.mainThread;
const categories = parsedTrace.eventCategoryTime[mainThreadId];
console.log(categories);
```

## Development

* The format for trace-log events is described [here][event-format].
* A [python parser][trace-parser] for tracelogs is available from WPO Foundation.
* Chrome-trace uses [Ava] for testing. Please run ```npm run test``` before submitting PRs.
* Code formatting by [Prettier]. Please run ```npm run lint:fix``` before submitting PRs.
* Optional verbose logging using the [debug] module.
* Additional useful npm scripts are:
   * ```test:verbose``` for additional debug info
   * ```test:watch``` to rerun tests as changes are made
   * ```test:watch:verbose``` automatic testing, with debug output

[travis-image]: https://img.shields.io/travis/sitespeedio/chrome-trace.svg?style=flat-square
[travis-url]: https://travis-ci.org/sitespeedio/chrome-trace
[Prettier]: https://prettier.io
[Ava]: https://ava.li
[debug]: https://github.com/visionmedia/debug
[event-format]: https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU
[trace-parser]: https://github.com/WPO-Foundation/trace-parser
