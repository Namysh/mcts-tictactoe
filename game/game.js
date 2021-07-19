import Board from './board.js';
import MonteCarloTreeSearch from '../mcts/monte-carlo-tree-search.js';
import Node from '../mcts/node.js';
import State from '../mcts/state.js';
import { IA1, IA2, EMPTY, DRAW } from '../common/types.js';
import {getOtherPlayer} from '../common/utils.js';

class Game {
  scores;

  constructor() {
    this.board = new Board();
    this.scores = { [IA1]: 0, [IA2]: 0, [DRAW]: 0 };
  }

  reset() {
    this.board = new Board();
  }

  randomGame() {
    let player = IA1;

    const mcts = new MonteCarloTreeSearch(this.board.copy(), player);

    let winner;
    while((winner = this.board.check()) === EMPTY ) {
      if (player === IA1) {
        mcts.root = new Node(new State(this.board.copy(), getOtherPlayer(player)));
        mcts.player = player;
        const best = mcts.run(500);
        this.board.makeMove(best.state.move, player)

      } else if (player === IA2) {
        mcts.root = new Node(new State(this.board.copy(), getOtherPlayer(player)));
        mcts.player = player;
        const best = mcts.run(500);
        this.board.makeMove(best.state.move, player)
      }

      player = getOtherPlayer(player)


    }

    this.scores[winner]++;
  }

  
}

export default Game;