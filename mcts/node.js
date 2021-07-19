class Node {
  childs = [];

  constructor(state, parent = null) {
    this.state = state;
    this.parent = parent;
  }


  getRandomChild() {
    return this.childs[Math.floor(Math.random() * this.childs.length)]
  }

  addChild(child) {
    this.childs.push(child);
  }

  isLeaf() {
    return this.childs.length === 0;
  }
}

export default Node;