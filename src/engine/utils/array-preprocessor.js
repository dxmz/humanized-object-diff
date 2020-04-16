import equal from 'fast-deep-equal';

function preProcessArray(diffs = [], lhs = [], rhs = []) {
  const groupedDiffs = groupDiffsByPath(diffs);

  let diffStrings = [];

  for (const path in groupedDiffs) {
    if (Object.prototype.hasOwnProperty.call(groupedDiffs, path)) {
      let lhsVal = lhs;
      let rhsVal = rhs;

      for (const p of path.split(/\[|\]|\./gi).filter(Boolean)) {
        lhsVal = lhsVal[p];
        rhsVal = rhsVal[p];
      }

      const groupedDiff = groupedDiffs[path];

      const { insertions, cutoff } = getInsertions(lhsVal, rhsVal);

      const changes = insertions
        .concat(
          groupedDiff
            .filter(diff => diff.index < cutoff && diff.kind === 'E')
            .map(diff => ({ ...diff, dotpath: path, kind: 'AE' }))
        )
        .map(diff => ({
          ...diff,
          path: path.split(/\[|\]|\./gi).filter(Boolean),
          dotpath: path
        }));
      diffStrings = diffStrings.concat(changes);
    }
  }

  return diffStrings;
}

function groupDiffsByPath(diffs) {
  const diffGroups = {};

  for (const diff of diffs) {
    diff.index = diff.index || diff.path[diff.path.length - 1];
    if (diffGroups[diff.dotpath] && Array.isArray(diffGroups[diff.dotpath]))
      diffGroups[diff.dotpath].push(diff);
    else diffGroups[diff.dotpath] = [diff];
  }

  return diffGroups;
}

function getInsertions(lhs = [], rhs = []) {
  const insertionCount = rhs.length - lhs.length;
  const kind = insertionCount !== 0 && insertionCount > 0 ? 'I' : 'R';
  const longer = kind === 'I' ? [...rhs] : [...lhs];
  const shorter = kind === 'I' ? [...lhs] : [...rhs];
  const longerLength = longer.length;
  const insertions = [];

  let absCount = Math.abs(insertionCount);
  let negIndex = 0;

  while (absCount !== 0) {
    negIndex -= 1;
    if (
      equal(longer[longer.length - 1], shorter[longer.length - 1 - absCount])
    ) {
      longer.pop();
      shorter.pop();
    } else {
      const val = longer.pop();
      const index = longerLength - Math.abs(negIndex);
      insertions.push({
        kind,
        index,
        val
      });
      absCount -= 1;
    }
  }

  return {
    insertions,
    cutoff: Math.min(...insertions.map(ins => ins.index))
  };
}

export default preProcessArray;
