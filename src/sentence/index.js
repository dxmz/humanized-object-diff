import getNewVal from './utils/get-new-val';
import getField from './utils/get-field';
import formatTextPath from './utils/get-format-text-field';
import getDotpath from './utils/get-dot-path';
import getOldVal from './utils/get-old-val';
import formatDotPathToText from './utils/format-dot-path-to-text';
import Handlebars from 'handlebars/lib/handlebars';

class DiffSentence {
  constructor(diff, config, templates, formatTextStructure, lhs) {
    const context = { diff, config, templates, formatTextStructure, lhs };
    this.diff = diff;
    this.FIELD = getField.call(context);
    this.OLD_VALUE = getOldVal.call(context);
    this.NEW_VALUE = getNewVal.call(context);
    this.DOT_PATH = getDotpath.call(context);
    this.DOT_TEXT = formatDotPathToText.call(context);
    this.FORMAT_FIELD = formatTextPath.call(context);
    this.INDEX = diff.index;
    this.POSITION = diff.index && diff.index - 1;
    this.template = this.getTemplate(context);
    this.format = this.format.bind(this);
  }

  format() {
    const tokens = {
      'FIELD': this.FIELD,
      'FORMAT_FIELD': this.FORMAT_FIELD,
      'DOT_PATH': this.DOT_PATH,
      'DOT_TEXT': this.DOT_TEXT,
      'NEW_VALUE': this.NEW_VALUE,
      'OLD_VALUE': this.OLD_VALUE,
      'INDEX': this.INDEX,
      'POSITION': this.POSITION
    };

    return this.compileTemplate(this.template, tokens);
  }

  compileTemplate(templateStr, tokens) {
    const template = Handlebars.compile(templateStr);

    return template(tokens);
  }


  getTemplate({ config, templates, diff }) {
    if (config.sensitivePaths.includes(diff.dotpath))
      return templates[`${diff.kind}S`];
    return templates[diff.kind];
  }
}

export default DiffSentence;
