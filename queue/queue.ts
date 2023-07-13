import { RGBADepthPacking } from "three";

export class Queue<DataType> {
  queue: DataType[]
  maxLength: number
  constructor(maxLength) {
    if (maxLength < 0) {
      throw new Error("maxLength must be non-negative");
    }
    this.queue = []
    this.maxLength = maxLength
  }

  /**
   * inserts item into queue
   * @param data string to be inserted
   * @returns queue position if success, -1 if failed to insert
   */
  enqueue<DataType>(data: DataType): number {
    throw new Error("method not implemented");
  }

  /**
   * removes item from front of queue.
   * Throws an error if queue is empty
   * @returns data from removed element
   */
  dequeue(): string {
    throw new Error("method not implemeneted");
  }

  /**
   * gets current length of the queue
   * @returns queue length
   */
  getLength(): number {
    throw new Error("method not implemented");
  }

  /**
   * checks if the queue is full
   * @returns true if full, false otherwise
   */
  isFull(): boolean {
    throw new Error("method not implemented");
  }

  /**
   * checks if the queue is empty
   * @returns true if empty, false otherwise
   */
  isEmpty(): boolean {
    throw new Error("method not implemented");
  }
}

Queue.prototype.enqueue = function <DataType>(this: Queue<DataType>, data: DataType): number {
  if (this.queue.length > this.maxLength) {
    return -1;
  }
  this.queue.push(data)
  return this.queue.length;
}

Queue.prototype.dequeue = function <DataType>(this: Queue<DataType>): DataType {
  if (this.queue.length <= 0) {
    throw new Error("Cannot remove element from empty queue");
  }
  const val = this.queue.shift();
  if (val == undefined) {
    throw new Error("returned undefined value from shift");
  }
  return val;
}

Queue.prototype.getLength = function (this: Queue<any>) {
  return this.queue.length;
}

Queue.prototype.isFull = function (this: Queue<any>) {
  if (this.queue.length == this.maxLength) {
    return true;
  } else {
    return false;
  }
}

Queue.prototype.isEmpty = function (this: Queue<any>) {
  if (this.queue.length == 0) {
    return true;
  } else {
    return false;
  }
}