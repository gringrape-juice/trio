// # 연결리스트로 스택 구현하기
// 1. push
// 2. isEmpty
// 3. peak
// 4. pop

class Node {
  constructor(value) {
    this.value = value;
    this.before = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
  }

  push(value) {
    const newNode = new Node(value);
    newNode.before = this.top;
    this.top = newNode;
  }
  
  isEmpty() {
    return this.top === null;
  }

  peek() {
    if (this.top === null) {
      throw new Error();
    }

    return this.top.value;
  }
  
  pop() {
    if (this.top === null) {
      throw new Error('top empty');
    }

    const item = this.top.value;
    this.top = this.top.before; 

    return item;
  }
}


test('stack - push', () => {
  const stack = new Stack();

  stack.push(1);
  expect(stack.top.value).toBe(1);
  
  stack.push(2);
  expect(stack.top.value).toBe(2);

  expect(stack.top.before.value).toEqual(1);
});

test('stack - isEmpty', () => {
  const stack = new Stack();

  expect(stack.isEmpty()).toBeTruthy();

  stack.push(1);
  
  expect(stack.isEmpty()).toBeFalsy();
});

test('stack - peek', () => {
  const stack = new Stack();

  expect(() => {stack.peek()}).toThrow();

  stack.push(1);

  expect(stack.peek()).toBe(1);
});

test('stack - pop', () => {
  const stack = new Stack();

  expect(() => {stack.pop()}).toThrowError('top empty');

  stack.push(1);

  expect(stack.pop()).toBe(1);

  expect(stack.isEmpty()).toBeTruthy();
});

