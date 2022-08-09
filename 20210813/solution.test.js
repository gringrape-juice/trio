/* eslint-disable no-param-reassign */
class LinkedList {
  constructor() {
    this.head = null;
  }

  appendToTail(value) {
    const newNode = new Node(value);
   
    if(!this.head) {
      this.head = newNode;
      return
    }

    let currentNode = this.head;

    while(currentNode.next !== null) {
      currentNode = currentNode.next;
    }
    
    currentNode.next = newNode;
  }

  select(index) {
    if(index === 0) {
      return this.head;
    }

    return [...Array(index)]
      .reduce((currentNode) => currentNode.next, this.head);

    // let currentNode = this.head;
    // for(let i = 0; i < index; i++) {
    //   currentNode = currentNode.next;
    // }

    // return currentNode;
  }

  // 1번째, 5를 넣는거
  insert(index, value) {
    const newNode = new Node(value);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    const prev = this.select(index - 1);
    prev.next = newNode;

    const current = this.select(index); //0번째.next =new  현재 1번째 -> 2번쨰
    newNode.next = current;

  }

  insertToHead(value) {
    this.insert(0, value);
  }

  delete(index) {
    // 0번째 노드르 삭제하면,
    // 0번째 노드의 next = head
    if(index === 0) {
      this.head = this.head.next;
      return;
    }

    const pre = this.select(index - 1);
    const current = this.select(index);
    pre.next = current.next;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }  
}

// [1]
test('Node', () => {
  const node = new Node(1);
  expect(node.value).toBe(1);
  expect(node.next).toBeNull();  
});

describe('LinkedList', () => {
  describe('appendToTail', () => {
    it('appends head', () => {
      const list = new LinkedList();
    
      list.appendToTail(1);
    
      expect(list.head.value).toBe(1);
    });

    it('appends node to the tail', () => {
      const list = new LinkedList();
    
      list.appendToTail(1);
      list.appendToTail(2);
      list.appendToTail(3);

      const {head} = list;
      
      expect(head.next.value).toBe(2);
      expect(head.next.next.value).toBe(3);
    });
  });

  // 1번쨰 노드의 값은?
  test('select', () => {
    const list = new LinkedList();

    list.appendToTail(1);

    expect(list.select(0).value).toBe(1);

    list.appendToTail(2);

    expect(list.select(1).value).toBe(2);

    list.appendToTail(3);

    expect(list.select(2).value).toBe(3);
  });

  test('insert', () => {
    const list = new LinkedList();

    list.appendToTail(1);
    list.appendToTail(2);
    list.appendToTail(3);

    list.insert(1, 5);

    expect(list.select(1).value).toBe(5);


    list.insert(2, 6);

    expect(list.select(2).value).toBe(6);

    list.insert(0, 777);
    
    expect(list.head.value).toBe(777);
  })

  test('insertToHead', () => {
    const list = new LinkedList();
    
    list.appendToTail(1);
    list.appendToTail(2);
    
    list.insertToHead(777);
    
    expect(list.head.value).toBe(777);
  })

  test('delete head ', () => {
    const list = new LinkedList();
    
    list.appendToTail(1);
    list.appendToTail(2);
    list.appendToTail(3);

    list.delete(0);
    
    expect(list.head.value).toBe(2);
    
  })

  test('delete not head', () => {
    const list = new LinkedList();
    
    list.appendToTail(1);
    list.appendToTail(2);
    list.appendToTail(3);

    list.delete(1);
    
    expect(list.head.next.value).toBe(3);
  })
});

