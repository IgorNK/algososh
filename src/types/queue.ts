export interface IQueueDisplayHandler {
  enqueue: (item: string) => void;
  dequeue: () => void;
  clearQueue: () => void;
}

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => T | null;
  peek: () => T | null;
  copy: () => IQueue<T>;
  isEmpty: () => boolean;
  getHead: () => number;
  getTail: () => number;
  toArray: () => (T | null)[];
}

export class Queue<T> implements IQueue<T> {
  private items: (T | null)[] = [];
  private head = 0;
  private tail = -1;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    console.log(`creating queue with size: ${size}`);
    this.size = size;
    this.items = Array(size);
    this.tail = size - 1;
  }

  enqueue(item: T) {
    console.log(`length: ${this.length}, size: ${this.size}`);
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    const position = (this.tail + 1) % this.size;
    console.log(`queueing in position: ${position}`);
    this.items[position] = item;
    this.tail = position;
    this.length++;
    console.log(
      `head: ${this.head}, tail: ${this.tail}, length: ${this.length}`,
    );
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    const item = this.items[this.head];
    this.items[this.head] = null;
    this.head = (this.head + 1) % this.size;
    console.log(`this.head + 1: ${this.head + 1}, size: ${this.size}`);
    this.length--;
    console.log(`head: ${this.head}, tail: ${this.tail}`);
    return item;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.items[this.head];
  }

  isEmpty() {
    return this.length === 0;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  copy() {
    const newQueue = new Queue<T>(this.size);
    newQueue.items = this.items.slice();
    newQueue.head = this.head;
    newQueue.tail = this.tail;
    newQueue.length = this.length;
    return newQueue;
  }

  toArray() {
    const newArray = [];
    for (let i = 0; i < this.size; i++) {
      const element = this.items[i];
      if (element) {
        newArray.push(element);
      } else {
        newArray.push(null);
      }
    }
    return newArray;
  }
}
