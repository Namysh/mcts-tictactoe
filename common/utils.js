import {IA1, IA2} from './types.js';

const getOtherPlayer = (player) => player == IA1 ? IA2 : IA1;

export {
  getOtherPlayer
}