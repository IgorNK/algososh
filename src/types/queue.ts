interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => T | null;
  peek: () => T | null;
}

export default class Queue<T> implements IQueue<T> {
  private items: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.items = Array(size);
  }

  enqueue(item: T) {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    this.items[this.tail] = item;
    this.tail = (this.tail + 1) % this.size;
    this.length++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    const item = this.items[this.head];
    this.items[this.head] = null;
    this.head = (this.head + 1) & this.size;
    this.length--;
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
}
