const daaSolution = (gems) => {
  const resultArray = [];

  const displayStand = gems;

  const bosukKinds = [...new Set(gems)];
  let intervals = bosukKinds.length;

  while (intervals <= gems.length) {
    for (let startIndex = 0; startIndex <= (displayStand.length - bosukKinds.length); startIndex++) {
      const endNumber = startIndex + intervals;

      const range = gems.slice(startIndex, endNumber);

      // range vs bosukKinds
      const bosukMap = new Map();
      range.forEach((bosuk) => {
        const cnt = bosukMap.get(bosuk) ? bosukMap.get(bosuk) + 1 : 1;
        bosukMap.set(bosuk, cnt);
      });

      for (let i = 0; i < bosukKinds.length; i++) {
        const targetBosuk = bosukKinds[i];

        if (!bosukMap.get(targetBosuk)) {
          break;
        } else {
          if (bosukMap.get(targetBosuk) === 0) {
            bosukMap.delete(targetBosuk);
          } else {
            bosukMap.set(targetBosuk, bosukMap.get(targetBosuk) - 1);
          }

          if (i === bosukKinds.length - 1) {
            resultArray.push(startIndex + 1);
            resultArray.push(endNumber);

            return resultArray;
          }
        }
      }
    }
    intervals++;
  }
  return resultArray;
};

// 다희 풀이
test('sample', () => {
  const gems = ['DIA', 'RUBY', 'RUBY', 'DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA'];
  expect(daaSolution(gems)).toEqual([3, 7]);
});

test('sample', () => {
  const gems = ['ZZZ', 'YYY', 'NNNN', 'YYY', 'BBB'];
  expect(daaSolution(gems)).toEqual([1, 5]);
});
