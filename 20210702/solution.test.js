// 오늘
// 주어진 것
// s : 순열이 될 문자열
// p : 타겟 문자열

// 구해야 하는 것
// result : p에 존재하는 s의 순열의 위치 - 시작점

// 계획
// - 시작점과 끝점으로 `평가`할 범위(range)을 정한다.
// - `평가` : range의 문자열별 갯수 vs s의 문자열별 갯수
// - `평가 방법`
// 1. s, range
// (1) s의 들어있는 문자열이 무엇인지
// (2) 각 문자열이 몇개씩 있는지
// 2. range

/* eslint-disable no-param-reassign */
test('test is working', () => {
  expect(1 + 1).toBe(2);
});
function count(s) {
  return s
    .split('')
    .reduce((acc, cur) => {
      if (!acc[cur]) {
        acc[cur] = 1;
        return acc;
      }

      acc[cur] += 1;
      return acc;
    }, {});
}

function solution(s, p) {
  const compare = (obj1, obj2) => Object.keys(obj2)
    .every((key) => obj1[key] === obj2[key]);

  const array = [];
  // 시작점 0 에서 탐색된다... 탐색된다?
  let start = 0;
  const last = p.length - s.length;
  // p의 길이 - s.length
  while (start <= last) {
    const range = p.slice(start, start + s.length);
    const isMatch = compare(
      count(s),
      count(range),
    );

    if (isMatch) {
      array.push(start);
    }
    start++;
  }

  return array;
}

test('문자의 종류와 개수', () => {
  expect(count('abbc')).toEqual({
    a: 1,
    b: 2,
    c: 1,
  });
});

test('혜원 알고리즘 1', () => {
  const s = 'abbc';
  const p = 'bbaca';

  expect(solution(s, p)).toStrictEqual([0]);
});

test('혜원 알고리즘 2', () => {
  const s = 'abbc';
  const p = 'bbacabbc';

  expect(solution(s, p)).toStrictEqual([0, 3, 4]);
});

test('혜원 알고리즘 3', () => {
  const s = 'abbc';
  const p = 'cbabadcbbabbcbabaabccbabc';

  expect(solution(s, p).length).toStrictEqual(7);
  expect(solution(s, p)).toEqual([
    0, 6, 9, 11, 12, 20, 21,
  ]);
});

test('strict equal', () => {
  const obj1 = { a: 1, b: undefined };
  const obj2 = { a: 1 };

  expect(obj1).toEqual(obj2);
  expect(obj1).not.toStrictEqual(obj2);
});
