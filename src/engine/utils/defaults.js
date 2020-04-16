export const defaultTemplate = {
  dateFormat: 'MM/dd/yyyy hh:mm a',
  objectName: 'Obj',
  ignoreArrays: false,
  sensitivePaths: [],
  dontHumanizePropertyNames: false,
  templates: {
    N: '"{{FIELD}}", with a value of "{{NEW_VALUE}}" (at {{DOT_PATH}}) was added',
    D: '"{{FIELD}}", with a value of "{{OLD_VALUE}}" (at {{DOT_PATH}}) was removed',
    E:
      '"{{FIELD}}", with a value of "{{OLD_VALUE}}" (at {{DOT_PATH}}) was changed to "{{NEW_VALUE}}"',
    I:
      'Array "{{FIELD}}" (at {{DOT_PATH}}), had a value of "{{NEW_VALUE}}" inserted at index {{INDEX}}',
    R:
      'Array "{{FIELD}}" (at {{DOT_PATH}}), had a value of "{{OLD_VALUE}}" removed at index {{INDEX}}',
    AE:
      'Array "{{FIELD}}" (at {{DOT_PATH}}), had a value of "{{OLD_VALUE}}" changed to "{{NEW_VALUE}}" at index {{INDEX}}',
    NS: '"{{FIELD}}" (at {{DOT_PATH}}) was added',
    DS: '"{{FIELD}}" (at {{DOT_PATH}}) was removed',
    ES: '"{{FIELD}}" (at {{DOT_PATH}}) was changed',
    IS: 'Array "{{FIELD}}" (at {{DOT_PATH}}), had a value inserted at index {{INDEX}}',
    RS: 'Array "{{FIELD}}" (at {{DOT_PATH}}), had a value removed at index {{INDEX}}',
    AES: 'Array "{{FIELD}}" (at {{DOT_PATH}}), had a value changed at index {{INDEX}}'
  }
};

export const formatPathTemplate = {
  dateFormat: 'MM/dd/yyyy hh:mm a',
  objectName: 'Obj',
  ignoreArrays: false,
  sensitivePaths: [],
  dontHumanizePropertyNames: false,
  templates: {
    N: '"{{FORMAT_FIELD}}", with a value of "{{NEW_VALUE}}" (at {{DOT_TEXT}}) was added',
    D: '"{{FORMAT_FIELD}}", with a value of "{{OLD_VALUE}}" (at {{DOT_TEXT}}) was removed',
    E:
      '"{{FORMAT_FIELD}}", with a value of "{{OLD_VALUE}}" (at {{DOT_TEXT}}) was changed to "{{NEW_VALUE}}"',
    I:
      'Array "{{FORMAT_FIELD}}" (at {{DOT_TEXT}}), had a value of "{{NEW_VALUE}}" inserted at index {{INDEX}}',
    R:
      'Array "{{FORMAT_FIELD}}" (at {{DOT_TEXT}}), had a value of "{{OLD_VALUE}}" removed at index {{INDEX}}',
    AE:
      'Array "{{FORMAT_FIELD}}" (at {{DOT_TEXT}}), had a value of "{{OLD_VALUE}}" changed to "{{NEW_VALUE}}" at index {{INDEX}}',
    NS: '"{{FORMAT_FIELD}}" (at {{DOT_TEXT}}) was added',
    DS: '"{{FORMAT_FIELD}}" (at {{DOT_TEXT}}) was removed',
    ES: '"{{FORMAT_FIELD}}" (at {{DOT_TEXT}}) was changed',
    IS: 'Array "{{FORMAT_FIELD}}" (at {{DOT_TEXT}}), had a value inserted at index {{INDEX}}',
    RS: 'Array "{{FORMAT_FIELD}}" (at {{DOT_TEXT}}), had a value removed at index {{INDEX}}',
    AES: 'Array "{{FORMAT_FIELD}}" (at {{DOT_TEXT}}), had a value changed at index {{INDEX}}'
  }
};
