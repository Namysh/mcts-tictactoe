import Game from './game/game.js';

const game = new Game();

for (let i = 0; i < 100; i++) {
  game.randomGame();
  game.reset();
}

console.log(game.scores);
