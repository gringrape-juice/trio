/**
 * 보석 쇼핑
 *
 * 구하는 것
 * 모든 보석을 하나 이상 가지고 있는 가장 짧은 구간의 시작 번호, 끝 번호
 *
 * 아는 것
 * 보석 4종류(RUBY, DIA, EMERALD, SAPPHIRE)
 *
 * 주어진 것
 * gems: 보석 진열대 배열
 *
 * 계획
 * 진열대의 보석들을 간단한 배열로 만든다.
 * 구간을 정한다.
 * 구간의 길이 : 4 ~ 진열대의 길이
 * 구간에 보석들이 적어도 하나 이상 있는지 확인한다.
 * 하나 이상 있는 구간들 중 가장 짧은 구간을 선택한다.
 * 가장 짧은 구간이 여러개면 첫번째로 선택한다.
 * 구간의 시작과 끝을 구한다.
 */

const solution = (gems) => {
  const kinds = [...new Set(gems)];

  let endNumber = kinds.length - 1;
  // 범위를 지정하고 , 다음범위는 그럼??? 나왔을때와 안나왔을때,
  // 답이 나왔을때는 =>
  const array = [];
  // start 와 end 사이에 모든 보석이 포함된다... -> 이걸 표현
  // kinds(gems(startNumber, endNumber)) == kinds(전체)

  // 방법 1. startNumber는 동일하게, endNumber는 +1 증가 : 구간의 길이 변경 -> 국소부분

  for (let startNumber = 0;
    startNumber < gems.length - kinds.length;
    startNumber++) {
    endNumber = startNumber + kinds.length - 1;

    while (endNumber < gems.length) {
      const range = gems.slice(startNumber, endNumber + 1);
      const result = kinds.filter((gem) => range.includes(gem));

      if (result.length === kinds.length) {
        array.push([startNumber + 1, endNumber + 1]); // 모든 보석을 하나 이상 가지고 있는 구간
      }
      endNumber += 1;
    }
  }
  // 방법 2. 구간의 길이는 동일하게 하고, startNumber
  const sort = array.sort((a, b) => (a[1] - a[0]) - (b[1] - b[0]));
  return sort[0];
};

// test('simple', () => {
//   expect(solution(
//     ['A', 'B', 'C', 'A'],
//   )).toEqual([0, 2]);
// });

// test('simple2', () => {
//   expect(solution(
//     ['A', 'C', 'C', 'B'],
//   )).toEqual([0, 3]);
// });

// test('simple3', () => {
//   expect(solution(
//     ['B', 'A', 'B', 'C', 'A'],
//   )).toEqual([1, 3]);
// });

test('sample', () => {
  const gems = ['DIA', 'RUBY', 'RUBY', 'DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA'];
  expect(solution(gems)).toEqual([3, 7]);
});

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
