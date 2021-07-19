import { EMPTY, DRAW } from '../common/types.js';

class Board {
  constructor(grid = Array(9).fill(EMPTY)) {
    this.grid = grid;
  }

  copy() {
    return new Board([...this.grid]);
  }

  makeRandomMove(player) {
    const possibleMoves = this.getPossibleMoves();
    this.makeMove(
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)],
      player
    );
  }

  makeMove(cell, player) {
    this.grid[cell] = player;
  }

  getPossibleMoves() {
    return this.grid.reduce(
      (moves, state, cell) => (
        state === EMPTY && moves.push(cell), moves
      ),
      []
    );
  }

  check() {
    const winCombinaisons = [
      "012",
      "345",
      "678",
      "036",
      "147",
      "258",
      "246",
      "048",
    ];

    let winner = EMPTY;

    winCombinaisons.some((combinaison) =>
      [...combinaison].every((cell) => this.grid[cell] === this.grid[combinaison[0]])
        ? (winner = this.grid[combinaison[0]])
        : false
    );


    if(this.getPossibleMoves().length == 0 && winner === EMPTY)
      return DRAW;

    return winner;
  }
  
  print() {
    console.log(`_____________`);
    for (let y = 0; y < 3; y++) {
      console.log(
        `| ${this.grid[3 * y + 0]} - ${this.grid[3 * y + 1]} - ${
          this.grid[3 * y + 2]
        } | ` + y
      );
    }
  }
}

export default Board;