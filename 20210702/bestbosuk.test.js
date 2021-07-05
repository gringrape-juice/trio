function solution(gems) {
  const gemVarietyCounts = new Set(gems).size;

  const gemMap = new Map();
  //   const gemLengths = [];

  let minRange = [1, gems.length];

  gems.forEach((gem, i) => {
    gemMap.delete(gem);
    gemMap.set(gem, i);
    // console.log('gemMap : ', gemMap);

    if (gemMap.size === gemVarietyCounts) {
      // console.log('gemMap.values() : ', gemMap.values());
      // console.log('gemMap.values().next() : ', gemMap.values().next());
      // console.log('gemMap.values().next().value : ', gemMap.values().next().value);

      const left = gemMap.values().next().value + 1;
      const right = i + 1;

      if (minRange[1] - minRange[0] > right - left) {
        minRange = [left, right];
        console.log('minRange : ', minRange);
      }
    //   gemLengths.push([gemMap.values().next().value + 1, i + 1]);
    }
  });

  // n+mlogm
  // gemLengths.sort((a, b) => {
  //   if ((a[1] - a[0]) === (b[1] - b[0])) {
  //     return a[1] - b[1];
  //   }
  //   return (a[1] - a[0]) - (b[1] - b[0]);
  // });

  return minRange;
}

// A B C
// A A B C A A B C

// A A A A B C A A B C

// test('sample', () => {
//   const gems = ['DIA', 'RUBY', 'RUBY', 'DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA'];
//   expect(solution(gems)).toEqual([3, 7]);
// });

test('sample', () => {
  const gems = ['A', 'A', 'B', 'C', 'A', 'A', 'B', 'C'];
  expect(solution(gems)).toEqual([2, 4]);
});

test('sample', () => {
  const gems = ['A', 'A', 'A', 'D', 'E', 'F', 'G', 'B'];
  expect(solution(gems)).toEqual([1, 8]);
});
