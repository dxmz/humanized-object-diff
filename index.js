import diff from './src/engine';
import { defaultTemplate, formatPathTemplate } from './src/engine/utils/defaults';

class DiffEngine {
  constructor(config = {}) {
    const {isFormatPath = false} = config;
    const tlp = isFormatPath ? formatPathTemplate : defaultTemplate;
    config = { ...tlp, ...config };
    const { templates, formatTextStructure, ...conf } = config;
    this.formatTextStructure = formatTextStructure;
    this.config = conf;
    this.templates = { ...tlp.templates, ...templates };
    this.sentenceDiffs = [];
    this.sentences = [];
    this.diff = diff.bind(this);
  }
}

export default DiffEngine;
