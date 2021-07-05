function solution(gems) {
  const kinds = [...new Set(gems)];

  if (gems.length === 1) {
    return [1, 1];
  }

  let array = [1, gems.length];

  for (let startNumber = 0;
    startNumber <= gems.length - kinds.length;
    startNumber++) {
    let endNumber = startNumber + kinds.length;

    while (endNumber <= gems.length) {
      const range = gems.slice(startNumber, endNumber);
      const result = [...new Set(range)];
      if (result.length === kinds.length
          && endNumber - (startNumber + 1) < array[1] - array[0]) {
        array = [startNumber + 1, endNumber];
        break;
      }
      endNumber += 1;
    }
  }

  return array;
}

test('sample', () => {
  const gems = ['DIA', 'RUBY', 'RUBY', 'DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA'];

  expect(solution(gems)).toEqual([3, 7]);
});
