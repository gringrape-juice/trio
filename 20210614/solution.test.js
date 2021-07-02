/* eslint-disable no-param-reassign */
test('test is working', () => {
  expect(1 + 1).toBe(2);
});

function pick(board, move) {
  const column = board.map((row) => row[move - 1]);
  const dollIndex = column.findIndex((doll) => doll !== 0);
  if (dollIndex < 0) {
    return null;
  }

  const doll = board[dollIndex][move - 1];
  board[dollIndex][move - 1] = 0;
  return doll;
}

test('pick at the same column', () => {
  const board = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 3],
    [0, 2, 5, 0, 1],
    [4, 2, 4, 4, 2],
    [3, 5, 1, 3, 1],
  ];

  expect(pick(board, 1)).toBe(4);
  expect(pick(board, 1)).toBe(3);
});

test('pick at the different column', () => {
  const board = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 3],
    [0, 2, 5, 0, 1],
    [4, 2, 4, 4, 2],
    [3, 5, 1, 3, 1],
  ];

  expect(pick(board, 1)).toBe(4);
  expect(pick(board, 2)).toBe(2);
});

test('pick at empty column', () => {
  const board = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 3],
    [0, 2, 5, 0, 1],
    [0, 2, 4, 4, 2],
    [3, 5, 1, 3, 1],
  ];

  pick(board, 1);

  expect(pick(board, 1)).toBe(null);
});

function put(basket, doll) {
  const basketSize = basket.length;

  if (basketSize === 0) {
    basket.push(doll);
    return 0;
  }

  const lastdollIndBasket = basket[basketSize - 1];

  if (doll === lastdollIndBasket) {
    basket.pop();
    return 2;
  }

  basket.push(doll);
  return 0;
}

test('put doll into basket', () => {
  const basket = [];

  expect(put(basket, 1)).toBe(0);

  expect(basket[0]).toBe(1);
});

test('if we put same doll then, bomb!', () => {
  const basket = [];

  put(basket, 1);

  expect(put(basket, 1)).toBe(2);
  expect(basket[0]).toBeUndefined();
});

function solution(board, moves) {
  const basket = [];

  return moves
    .map((move) => pick(board, move))
    .filter((doll) => doll)
    .map((doll) => put(basket, doll))
    .reduce((totalCount, popCount) => totalCount + popCount, 0);
}

test('solution', () => {
  const board = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 3],
    [0, 2, 5, 0, 1],
    [0, 2, 4, 4, 2],
    [3, 5, 1, 3, 1],
  ];
  const moves = [1, 5, 3, 5, 1, 2, 1, 4];

  expect(solution(board, moves)).toBe(4);
});
