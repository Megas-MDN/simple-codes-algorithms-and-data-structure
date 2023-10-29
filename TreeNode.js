class Node {
  #key;
  #left;
  #right;
  constructor(key) {
    this.#key = key;
    this.#left = null;
    this.#right = null;
  }
}

export default Node;
