import deepdiff from 'deep-diff';
import preProcessArrayDiffs from './utils/array-preprocessor';
import DiffSentence from '../sentence';
import Diff from '../diff';

function humanReadableDiff(lhs, rhs) {
  const arrayDiffs = [];
  const getType = Object.prototype.toString;
  const isObjectValue = function(val) {
    return typeof val === 'object' && val !== null;
  };
  this.sentenceDiffs = [];
  this.sentences = [];

  if (!Boolean(lhs) || !Boolean(rhs)) {
    if (lhs === rhs) {
      return ['Totally same values'];
    }

    return ['Totally different of the two values, one of values is empty!'];
  } else if (!isObjectValue(lhs) || !isObjectValue(rhs)) {
    console.warn('**humanized-object-diff waring:** diff values must be object type');
    return [];
  } else if (getType.call(lhs) !== getType.call(rhs)) {
    console.warn('**humanized-object-diff waring:** diff values must be same type');
    return ['Totally different of the two values, type of object is different!'];
  }

  let prefilter;
  if (Array.isArray(this.config.prefilter))
    prefilter = (path, key) =>
      path.length === 0 && this.config.prefilter.includes(key);
  else if (typeof this.config.prefilter === 'function')
    prefilter = this.config.prefilter;

  const differences = deepdiff(lhs, rhs, prefilter);
  if (!differences) return [];

  for (let diff of differences) {
    diff = new Diff(diff);

    if (diff.isArray) {
      if (!this.config.ignoreArrays) arrayDiffs.push(diff);
      continue;
    }

    const sentenceDiff = new DiffSentence(diff, this.config, this.templates, this.formatTextStructure, lhs);
    this.sentenceDiffs.push(sentenceDiff);
    this.sentences.push(sentenceDiff.format());
  }

  if (!this.config.ignoreArrays)
    for (const diff of preProcessArrayDiffs(arrayDiffs, lhs, rhs)) {
      const sentenceDiff = new DiffSentence(diff, this.config, this.templates, this.formatTextStructure, lhs);
      this.sentenceDiffs.push(sentenceDiff);
      this.sentences.push(sentenceDiff.format());
    }

  return this.sentences;
}

export default humanReadableDiff;
