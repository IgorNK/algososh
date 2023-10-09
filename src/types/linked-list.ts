export interface ILinkedListDisplayHandler {
  addHead: (item: string) => void;
  addTail: (item: string) => void;
  removeHead: () => void;
  removeTail: () => void;
  addAt: (index: number) => void;
  removeAt: (index: number) => void;
}

interface INode<T> {
  next: Node<T> | null;
  prev: Node<T> | null;
}

export class Node<T> implements INode<T> {
  public next: Node<T> | null = null;
  public prev: Node<T> | null = null;
  constructor(public value: T) { }
}

interface ILinkedList<T> {
  insertAtBeginning: (value: T) => Node<T>;
  insertAtEnd: (value: T) => Node<T>;
  removeAtBeginning: () => void;
  removeAtEnd: () => void;
  insertAtIndex: (value: T, index: number) => Node<T>;
  removeAtIndex: (index: number) => void;
  getSize: () => number;
  getHead: () => Node<T> | null;
  getTail: () => Node<T> | null;
  toArray: () => Array<T>;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null = null;
  private size: number = 0;

  insertAtBeginning(value: T) {
    const node = new Node(value);
    if (this.head) {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    } else {
      this.head = node;
    }
    this.size++;
    return node;
  }

  insertAtEnd(value: T) {
    const node = new Node(value);
    const tail = this.getTail();
    if (tail) {
      node.prev = tail;
      tail.next = node;
    } else {
      this.head = node;
    }
    this.size++;
    return node;
  }

  getHead(): Node<T> | null {
    return this.head;
  }

  getTail(): Node<T> | null {
    if (!this.head) {
      return null;
    } else {
      const getLast = (node: Node<T>): Node<T> => {
        return node.next ? getLast(node.next) : node;
      };
      return getLast(this.head);
    }
  }

  getSize() {
    return this.size;
  }

  deleteNode(node: Node<T>): void {
    if (!node.prev) {
      this.head = node.next;
    } else {
      const prevNode = node.prev;
      prevNode.next = node.next;
    }
    this.size--;
  }

  removeAtBeginning() { }

  removeAtEnd() { }

  insertAtIndex(value: T, index: number) {
    const node = new Node<T>(value);
    return node;
  }

  removeAtIndex() { }

  toArray(): Array<T> {
    const array: Array<T> = [];
    if (!this.head) {
      return array;
    }

    const addToArray = (node: Node<T>): Array<T> => {
      array.push(node.value);
      return node.next ? addToArray(node.next) : array;
    };

    return addToArray(this.head);
  }
}
