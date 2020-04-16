import isArray from './utils/is-array';
import appendDotPath from './utils/append-dot-path';

class Diff {
  constructor(diff) {
    this.kind = diff.kind;
    this.index = diff.index;
    this.lhs = diff.lhs;
    this.rhs = diff.rhs;
    this.item = diff.item;
    this.path = diff.path;
    this.formatTextPath = diff.formatTextPath;
    this.isArray = isArray(diff);
    this.dotpath = appendDotPath(diff);
  }
}

export default Diff;
