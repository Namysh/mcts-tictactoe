class State {
  constructor(board, player, move = -1) {
    this.board = board;
    this.player = player;
    this.move = move ;
    this.visit = 0;
    this.win = 0;
    this.draw = 0;
  }

  incrementVisit() {
    this.visit++;
  }

  incrementWin() {
    this.win++;
  }

  incrementDraw() {
    this.draw++;
  }
}

export default State;