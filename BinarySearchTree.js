import Node from './TreeNode.js';
import { fnCompare } from './LinkedList.js';

class BinarySearchTree {
  #compareFn;
  #root;
  constructor(compareFn = fnCompare) {
    this.#compareFn = compareFn;
    this.#root = null;
  }
}
