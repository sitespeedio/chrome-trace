'use strict';

import * as fs from 'fs';
import * as path from 'path';
import parser from '../';

const TRACEFLOGSPATH = path.resolve(__dirname, 'fixtures', 'tracelogs');

export async function parseTracelog(filename, options = {}) {
  return parser.parseStream(
    fs.createReadStream(path.resolve(TRACEFLOGSPATH, filename), options)
  );
}
