import Node from './node.js';
import State from './state.js';
import { EMPTY, DRAW } from '../common/types.js';
import {getOtherPlayer} from '../common/utils.js';

class MonteCarloTreeSearch {
  constructor(board, player) {
    this.board = board;
    this.player = player;
    this.root = new Node(new State(board, player));
  }

  run(iteration) {
    for(let i = 0; i < iteration; i++) {
      // selection
      let promisingNode = this.selection(this.root);

      // expansion
      if(promisingNode.state.board.check() == EMPTY)
        this.expansion(promisingNode);

      // simulation
      let nodeToExplore = promisingNode;
      if(nodeToExplore.childs.length != 0) {
        nodeToExplore = nodeToExplore.getRandomChild();
      }

      const winnerSimulation = this.simulation(nodeToExplore);

      // backpropagation
      this.backpropagation(nodeToExplore, winnerSimulation);
    }

    return this.root.childs.sort(
      (a, b) => b.state.visit - a.state.visit)[0]
  }

  selection(node) {
    // find leaf & UCT (UCB1)
    while (!node.isLeaf()) {
      const tmp =  this.findUCT(node);
      node = tmp
    }
    return node;
  }

  expansion(node) {
    const parentState = node.state;
    const parentBoard = parentState.board;
    const player = parentState.player;
    parentBoard.getPossibleMoves().forEach(move => {
      const childBoard = parentBoard.copy();
      childBoard.makeMove(move, getOtherPlayer(player));
      node.addChild(new Node(new State(childBoard, getOtherPlayer(player), move), node));
    });
  }

  simulation(node) {
    let player = node.state.player;
    const board = node.state.board.copy();
    let winner;

    while ((winner = board.check()) === EMPTY ) {
      player = getOtherPlayer(player)
      board.makeRandomMove(player);
    }

    return winner;    
  }

  backpropagation(node, player) {
    while(node != null) {
      const state = node.state;
      state.incrementVisit();
      if(player === state.player) 
        state.incrementWin();
      else if(player === DRAW)
        state.incrementDraw();

        node = node.parent;
    }
  }

  findUCT(parentNode) {
    const val = parentNode.childs.reduce((acc, childNode) => {
      const res = this.UCT(childNode, parentNode);
      acc.push({node: childNode, value: res == 0 ? Infinity : res});
      return acc
    }, []);

    val.sort((a,b ) => b.value - a.value)
    return val[0].node;
  }

  UCT(childNode, parentNode) {
    const parentVisit = parentNode.state.visit;
    const nodeScore = childNode.state.win + childNode.state.draw;
    const nodeVisit = childNode.state.visit;
    let res  = nodeScore / nodeVisit +
    Math.SQRT2 * Math.sqrt(Math.log(parentVisit) / nodeVisit)
    res = res || 0

    return res
  }

  
}

export default MonteCarloTreeSearch;