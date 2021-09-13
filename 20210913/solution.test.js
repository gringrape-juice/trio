class Heap {
  constructor() {
    this.heap = [];
  }
  
  size() {
    return this.heap.length;
  }
 
  push(value) {
    this.heap.push(value);
    this.bubble();
  }

  bubble() {
    let childIndex = this.heap.length - 1;
    let parentIndex = Math.floor((childIndex - 1) / 2);

    while(this.heap[parentIndex] > this.heap[childIndex]) {
      const temp = this.heap[parentIndex];
      this.heap[parentIndex] = this.heap[childIndex];
      this.heap[childIndex] = temp;

      childIndex = parentIndex;
      parentIndex = Math.floor((childIndex - 1) / 2);
    }
  }

  capture(parentIndex = 0) {
    const leftChildIndex = parentIndex * 2 + 1;
    const rightChildIndex = parentIndex * 2 + 2;

    const hasNotChild = this.heap[leftChildIndex] === undefined;

    const hasOnlyLeftChild = this.heap[leftChildIndex] !== undefined && this.heap[rightChildIndex] === undefined;

    if(hasNotChild) {
      return
    }

    const childIndex = (hasOnlyLeftChild || this.heap[leftChildIndex] < this.heap[rightChildIndex])
      ? leftChildIndex 
      : rightChildIndex;
    
    if (this.heap[parentIndex] < this.heap[childIndex]) {
      return;
    }

    const temp = this.heap[parentIndex];
    this.heap[parentIndex] = this.heap[childIndex];
    this.heap[childIndex] = temp;

    this.capture(childIndex);
  }

  pop() {
    const result = this.heap.shift();

    if(this.heap.length === 0) {
      return result;
    }

    const last = this.heap.pop();

    this.heap.unshift(last);
    this.capture();

    return result;
  }
}

test('push pop', () => {
  const heap = new Heap();

  heap.push(1);
  heap.push(2);

  expect(heap.pop()).toBe(1);
  expect(heap.pop()).toBe(2);
});

test('push pop', () => {
  const heap = new Heap();

  heap.push(2);
  heap.push(1);
  heap.push(3);

  expect(heap.pop()).toBe(1);
});


test('heapSort', () => {
  const numbers = [1, 6, 2, 4, 5];
  
  function heapSort(array) {
    const heap = new Heap();
    
    array.forEach((i) => {
      heap.push(i);
    });
    
    const result = [];

    let size = heap.size();

    while(size > 0) {
      const v = heap.pop();
      result.push(v); 
      size--;
    }
    
    return result;
  }

  expect(heapSort(numbers)).toEqual([1, 2, 4, 5, 6]);
});
