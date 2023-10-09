export interface ILinkedListDisplayHandler {
  addHead: (item: string) => Promise<void>;
  addTail: (item: string) => Promise<void>;
  removeHead: () => Promise<void>;
  removeTail: () => Promise<void>;
  addAt: (item: string, index: number) => Promise<void>;
  removeAt: (index: number) => Promise<void>;
}

interface INode<T> {
  next: Node<T> | null;
  prev: Node<T> | null;
}

export class Node<T> implements INode<T> {
  public next: Node<T> | null = null;
  public prev: Node<T> | null = null;
  constructor(public value: T) {}
}

interface ILinkedList<T> {
  insertAtBeginning: (value: T) => Node<T>;
  insertAtEnd: (value: T) => Node<T>;
  removeAtBeginning: () => void;
  removeAtEnd: () => void;
  insertAtIndex: (value: T, index: number) => Node<T> | null;
  removeAtIndex: (index: number) => void;
  getSize: () => number;
  getHead: () => Node<T> | null;
  getTail: () => Node<T> | null;
  getAtIndex: (index: number) => Node<T> | null;
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

  getAtIndex(index: number): Node<T> | null {
    if (!this.head) {
      return null;
    }

    const travelTo = (node: Node<T>, index: number): Node<T> | null => {
      console.log(`travelling: index ${index}, value ${node.value}`);
      if (index === 0) {
        console.log("reached the index");
        return node;
      }
      if (!node.next) {
        console.log("no more nodes, returning null");
        return null;
      }
      console.log("lets go to next");
      return travelTo(node.next, index - 1);
    };

    return travelTo(this.head, index);
  }

  getSize() {
    return this.size;
  }

  deleteNode(node: Node<T>): void {
    if (!node.prev) {
      console.log("delete node: this node is head!");
      this.head = node.next;
      if (this.head) {
        this.head.prev = null;
      }
    } else {
      console.log("delete node: this node is not head.");
      console.log(`node prev: ${node.prev.value}`);
      node.prev.next = node.next;
      if (node.next) {
        node.next.prev = node.prev;
      }
    }
    this.size--;
  }

  removeAtBeginning() {
    if (!this.head) {
      console.log("no head from list itself!");
      return;
    }
    console.log("deleting from head");
    this.deleteNode(this.head);
  }

  removeAtEnd() {
    const tail = this.getTail();
    if (!tail) {
      return;
    }
    this.deleteNode(tail);
  }

  insertAtIndex(value: T, index: number) {
    const node = this.getAtIndex(index);
    if (!node) {
      console.log("node of such index does not exist!");
      return null;
    }
    const replacement = new Node(value);
    if (node.prev) {
      console.log(`fixing up previous node: ${node.prev.value}`);
      node.prev.next = replacement;
      replacement.prev = node.prev;
      console.log(
        `previous node's new next neighbour: ${node.prev.next.value}`
      );
    } else {
      replacement.prev = null;
      console.log(
        "current occupant does not have a previous node, it must be head!"
      );
    }
    replacement.next = node;
    console.log(
      `and the next node would be the past occupant: ${replacement.next.value}`
    );
    node.prev = replacement;
    console.log(
      `fixing up current node's previous neighbour: ${node.prev.value}`
    );
    return replacement;
  }

  removeAtIndex(index: number) {
    const node = this.getAtIndex(index);
    if (!node) {
      return;
    }
    this.deleteNode(node);
  }

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
