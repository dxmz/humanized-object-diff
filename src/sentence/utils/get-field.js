import humanize from './humanize';

function getField() {
  let propertyIndex = this.diff.path.length - 1;
  while (typeof this.diff.path[propertyIndex] !== 'string') propertyIndex -= 1;
  const property = this.diff.path[propertyIndex];
  return humanize(property, this.config);
}

export default getField;
