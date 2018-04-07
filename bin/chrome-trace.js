#!/usr/bin/env node
/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');
const parser = require('../');

if (process.argv.length !== 3) {
  throw new Error(`Usage: chrome-trace <TRACE_FILE>`);
}

const traceFilePath = path.resolve(process.argv[2]);
parser
  .parseStream(fs.createReadStream(traceFilePath))
  .then(json => console.log(json));
