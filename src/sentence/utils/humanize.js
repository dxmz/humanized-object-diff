import humanizeStr from 'humanize-string';
import titleize from 'titleize';

function humanize(prop, config) {
  return config.dontHumanizePropertyNames ? prop : titleize(humanizeStr(prop));
}

export default humanize;
