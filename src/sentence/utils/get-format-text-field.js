
function getFormatTextField() {
  let propertyIndex = this.diff.formatTextPath.length - 1;
  while (typeof this.diff.formatTextPath[propertyIndex] !== 'string') propertyIndex -= 1;
  return this.diff.formatTextPath[propertyIndex];
}

export default getFormatTextField;
