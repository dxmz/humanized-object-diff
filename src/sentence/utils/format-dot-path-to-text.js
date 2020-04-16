import get from 'lodash/get';

function formatDotPathToText() {

  if (this.formatTextStructure) {
    const getValue = (joinedPath) => {
      const regExp = new RegExp('\\[(\\d+)\\]', 'ig');
      // convert `[2].children[33].name` to `[0].children[0].name`
      const replacedPath = joinedPath.replace(regExp, '[0]');
      const structObj = get(this.formatTextStructure, `${replacedPath}`);
      // const showingValue = last ? get(this.lhs, joinedPath)[`${path}`] : '';
      const obj = Array.isArray(structObj) ? structObj[0] : structObj;

      // return showingValue ? obj.formatTextName + '[' + showingValue + ']' : obj.formatTextName;
      return obj.formatTextName;
    };

    const formatText = (path) => {
      const splitPath = path || this.diff.dotpath.split('.');
      let formatTextPath = [];

      let accPath = splitPath && splitPath.reduce((acc, path, index, arr) => {
        let last = index === arr.length - 1;
        let textPath = String(getValue(arr.slice(0, index + 1).join('.'), path, last));

        formatTextPath.push(textPath);
        return last ? acc.concat(textPath) : acc.concat(textPath, ' -> ');
      }, `${this.config.objectName} -> `);

      this.diff.formatTextPath = formatTextPath;

      return accPath;
    };

    if (this.diff.dotpath) {
      return formatText();
    }

    const path = this.diff.path.reduce(
      (acc, val, i) =>
        typeof val === 'string'
          ? typeof this.diff.path[i + 1] === 'string'
          ? acc.concat(`${String(val)}.`)
          : acc.concat(String(val))
          : typeof this.diff.path[i + 1] === 'string'
          ? acc.concat(`[${String(val)}].`)
          : acc.concat(`[${String(val)}]`),
      ''
    );

    return formatText(path);
  }

  return '';
}

export default formatDotPathToText;
