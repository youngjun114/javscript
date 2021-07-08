'use strict';
import PopUp from './popup.js';
import Game from './game.js';

const BUG_COUNT = 10;
const CARROT_COUNT = 10;
const GAME_DURATION_SECOND = 10;

const gameFinishBanner = new PopUp();

gameFinishBanner.setClickListner(() => {
  game.start();
});

const game = new Game(GAME_DURATION_SECOND, CARROT_COUNT, BUG_COUNT);
game.setGameStopListner((reason) => {
  let message;
  switch (reason) {
    case 'cancel':
      message = 'REPLAY?';
      break;
    case 'win':
      message = 'YOU WON';
      break;
    case 'lose':
      message = 'YOU LOST';
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});
