'use strict';

const { name } = require('../../package');
const debug = require('debug')(name);
const eventCategories = require('../eventCategories');
const durationProcessor = require('./durationEvents/durationProcessor');

const eventCategory = event => {
  let category = eventCategories[event.name];

  if (!category) {
    debug(`Can't match event type ${event.name} to any category`);
    category = 'Other';
  }

  return category;
};

module.exports = function createProcessor(cutoffMark) {
  let key = 'eventCategoryTime';
  if (cutoffMark) {
    key += `|${cutoffMark}`;
  }
  return durationProcessor(key, eventCategory, cutoffMark);
};
