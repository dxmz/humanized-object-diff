import React, { useState } from 'react';
import {
  render
} from 'react-dom';
import DiffEngine from '../../index.js';

const templates = {
  N: 'Add "{{FORMAT_FIELD}}", new value："{{NEW_VALUE}}" <span style="color: darkgray"><span style="color: darkgray">(at {{{DOT_TEXT}}})<span/><span/>',
  D: 'Remove "{{FORMAT_FIELD}}", value："{{OLD_VALUE}}" <span style="color: darkgray">(at {{{DOT_TEXT}}})</span>',
  E: 'Modify "{{FORMAT_FIELD}}", old value："{{OLD_VALUE}}" <span style="color: darkgray">(at {{{DOT_TEXT}}})</span>， new value："{{NEW_VALUE}}"',
  I: 'Array "{{FORMAT_FIELD}}" <span style="color: darkgray">(at {{{DOT_TEXT}}})<span/>, inserted "{{NEW_VALUE}} at index【{{INDEX}}】"',
  R: 'Array "{{FORMAT_FIELD}}" <span style="color: darkgray">(at {{{DOT_TEXT}}})<span/>, removed "{{OLD_VALUE}} at index【{{INDEX}}】"',
  AE: 'Array "{{FORMAT_FIELD}}" <span style="color: darkgray">(at {{{DOT_TEXT}}})<span/>, modified at index【{{INDEX}}】，old value is "{{OLD_VALUE}}" ，new value is "{{NEW_VALUE}}"',
  NS: 'Add Field "{{FORMAT_FIELD}}" <span style="color: darkgray">(at {{{DOT_TEXT}}})<span/>',
  DS: 'Remove Field "{{FORMAT_FIELD}}" <span style="color: darkgray">(at {{{DOT_TEXT}}})<span/>',
  ES: 'Modify Field "{{FORMAT_FIELD}}" <span style="color: darkgray">(at {{{DOT_TEXT}}})<span/>',
  IS: 'Array "{{FORMAT_FIELD}}" <span style="color: darkgray">(at {{{DOT_TEXT}}})<span/>, inserted a new value at index【{{INDEX}}】',
  RS: 'Array "{{FORMAT_FIELD}}" <span style="color: darkgray">(at {{{DOT_TEXT}}})<span/>, removed a new value at index【{{INDEX}}】',
  AES: 'Array "{{FORMAT_FIELD}}" <span style="color: darkgray">(at {{{DOT_TEXT}}})<span/>, modified a new value at index【{{INDEX}}】'
};

// const formatTextStructure = [
//   {
//     formatTextName: 'Readable Country Name',
//     id: { formatTextName: 'Identify' },
//     name: { formatTextName: 'City Style' },
//     nodeType: { formatTextName: 'Happy Ending' },
//     childList: [{
//       formatTextName: 'Free Beers Palace',
//       id: { formatTextName: 'Sub Identify' },
//       name: { formatTextName: 'My House' },
//       nodeType: { formatTextName: 'Sad Story' }
//     }]
//   }
// ];
//
// const lhs = [
//   {
//     'id': 1,
//     'name': 'test-left-1',
//     'nodeType': 'father',
//     'childList': [{ 'id': 2, 'name': 'child-left1', 'nodeType': 'child' },
//       { 'id': 3, 'name': 'child-left2', 'nodeType': 'child' },
//       { 'id': 4, 'name': 'child-left3', 'nodeType': 'child' },
//       { 'id': 5, 'name': 'child-left4', 'nodeType': 'child' }]
//   },
//   {
//     'id': 6,
//     'name': 'test-left-6',
//     'nodeType': 'father',
//     'childList': [{ 'id': 7, 'name': 'child-left7', 'nodeType': 'child' },
//       { 'id': 8, 'name': 'child-left8', 'nodeType': 'child' },
//       { 'id': 9, 'name': 'child-left9', 'nodeType': 'child' },
//       { 'id': 10, 'name': 'child-left10', 'nodeType': 'child' }]
//   }];
//
// const rhs = [{
//   'id': 1,
//   'name': 'test-left-1',
//   'nodeType': 'father',
//   'childList': [{ 'id': 2, 'name': 'child-left1', 'nodeType': 'child' },
//     { 'id': 4, 'name': 'child-left3', 'nodeType': 'child' },
//     { 'id': 5, 'name': 'child-left4', 'nodeType': 'child' }]
// },
//   {
//     'id': 11,
//     'name': 'test-left-6',
//     'nodeType': 'father',
//     'childList': [{ 'id': 7, 'name': 'child-left7', 'nodeType': 'child' },
//       { 'id': 8, 'name': 'child-right8', 'nodeType': 'child' },
//       { 'id': 12, 'name': 'child-right12', 'nodeType': 'child' },
//       { 'id': 10, 'name': 'child-left10', 'nodeType': 'child' }]
//   }];

const objectName = 'Sky-Stars';

const formatTextStructure = {
  id: { formatTextName: 'id' },
  name: { formatTextName: 'Universe Space' },
  code: { formatTextName: 'NamingSpace' },
  nodeType: { formatTextName: 'Member' },
  children: {
    formatTextName: 'Look Further',
    name: { formatTextName: 'Our Moon' },
    son: { formatTextName: 'Sun' },
    moon: [{
      formatTextName: 'Moon',
      area: { formatTextName: 'Total Surface Area' },
      height: { formatTextName: 'Absolute Straight Height' }
    }]
  }
};
const lhs = {
  id: 1, name: 'earth', code: '001', nodeType: 'star', children: {
    name: 'space-1', son: 'sunday', moon: [{ area: '255mm', height: 50 }]
  }
};
const rhs = {
  id: 2, name: 'water star', code: '001', nodeType: 'small block', children: {
    name: 'space-1', son: 'monday'
  }
};

function App() {
  const [diffList, setDiffList] = useState([]);

  function diffValue() {
    const diffEngine = new DiffEngine({ objectName, templates, formatTextStructure });
    const newDiffList = diffEngine.diff(lhs, rhs);

    setDiffList(newDiffList);
  }

  return (
    <div>
        <pre style={{ backgroundColor: 'f1f1f1', padding: '20px' }}>
            <code>
                Left hand side: {JSON.stringify(lhs)}
            </code>
            <br/>
            <code>
                Right hand side: {JSON.stringify(rhs)}
            </code>
        </pre>

      <button style={{ padding: '5px 10px', backgroundColor: '#1890ff', color: 'white', border: '1px solid #1890ff' }}
              onClick={() => {
                diffValue();
              }}>Start Diff
      </button>

      <div>
        <p style={{ fontWeight: 'bold' }}>Diff Sentences: </p>
        <div>
          {
            diffList && diffList.map((diff, index) => {
              return <div key={`diff-${index}`} style={{ margin: '5px' }}>
                {index + 1}、<span dangerouslySetInnerHTML={{ __html: diff }}/>
              </div>;
            })
          }
        </div>
      </div>
    </div>
  );
}

render(<App/>, document.getElementById('root'));
