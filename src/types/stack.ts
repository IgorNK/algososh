export interface IStackDisplayHandler {
  addToStack: (item: string) => void;
  popFromStack: () => void;
  clearStack: () => void;
}

interface IStack<T> {
  push: (item: T) => void;
  pop: () => T | null;
  peek: () => T | null;
  getSize: () => number;
  isEmpty: () => boolean;
  copy: () => Stack<T>;
  toArray: () => Array<T>;
}

export class Stack<T> implements IStack<T> {
  private items: T[] = [];

  constructor() {
    console.log("creating new stack");
  }

  push(item: T) {
    this.items.push(item);
  }

  pop() {
    const item = this.items.pop();
    if (item !== undefined) {
      return item;
    }
    return null;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.getSize() - 1];
  }

  getSize() {
    return this.items.length;
  }

  isEmpty() {
    return this.getSize() === 0;
  }

  copy() {
    const newStack = new Stack<T>();
    newStack.items = this.items.slice();
    return newStack;
  }

  toArray() {
    return this.items.slice();
  }
}
