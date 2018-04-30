'use strict';

import * as fs from 'fs';
import * as path from 'path';
import parser from '../';

const TRACELOGS_PATH = path.resolve(__dirname, 'fixtures', 'tracelogs');

const diff = (arr1, arr2) => arr1.filter(x => !arr2.includes(x));
const keys = Object.keys;
const compareNumbers = (actual, expected, maxDiffPercentage) =>
  Math.abs(actual / expected - 1) < maxDiffPercentage / 100;

export function roughlyEquals(actual, expected, maxDiffPercentage) {
  if (typeof actual !== typeof expected) {
    return false;
  }

  if (typeof actual === 'number') {
    return compareNumbers(actual, expected, maxDiffPercentage);
  }
  if (typeof actual === 'object' && !Array.isArray(actual)) {
    return (
      diff(keys(actual), keys(expected)).length === 0 &&
      Object.entries(actual).every(([key, value]) =>
        compareNumbers(value, expected[key], maxDiffPercentage)
      )
    );
  }
  return false;
}

export async function parseTracelog(filename, options = {}) {
  return parser.parseStream(
    fs.createReadStream(path.resolve(TRACELOGS_PATH, filename), options)
  );
}
