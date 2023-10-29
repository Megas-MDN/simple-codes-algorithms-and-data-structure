import Node from './TreeNode.js';
const fnCompare = (a, b) => (a > b ? 1 : -1);

class BinarySearchTree {
  #compareFn;
  #root;
  constructor(compareFn = fnCompare) {
    this.#compareFn = compareFn;
    this.#root = null;
  }
  insert(key) {
    if (this.#root === null) {
      this.#root = new Node(key);
      return;
    }
    this.insertNode(this.#root, key);
  }
  insertNode(node, key) {
    if (this.#compareFn(key, node.key) < 0) {
      if (node.left === null) {
        node.left = new Node(key);
        return;
      }
      return this.insertNode(node.left, key);
    }
    if (this.#compareFn(key, node.key) > 0) {
      if (node.right === null) {
        node.right = new Node(key);
        return;
      }
      return this.insertNode(node.right, key);
    }
  }
  search(key) {}
  remove(key) {}

  #inOrderTraversalNode(node, callback) {
    if (!node) return;
    this.#inOrderTraversalNode(node.left, callback);
    callback(node.key);
    this.#inOrderTraversalNode(node.right, callback);
  }
  inOrderTraversal(callback) {
    this.#inOrderTraversalNode(this.#root, callback);
  }
  preOrderTraversal() {}
  postOrderTraversal() {}
  min() {}
  max() {}
  toString() {
    let result = '';
    this.inOrderTraversal((key) => {
      result += key + ' ';
    });
    console.log(result, '<--- Result');
    return result;
  }
}

const testBinaryTree = () => {
  const tree = new BinarySearchTree();
  [11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25].forEach((key) => {
    tree.insert(key);
  });
  tree.toString();
};
testBinaryTree();
