'use strict';
import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';

const BUG_COUNT = 10;
const CARROT_COUNT = 10;
const GAME_DURATION_SECOND = 10;

const gameBtn = document.querySelector('.game_btn');
const difficulty = document.querySelector('.difficulty');
const easy = { carrotCount: 10, bugCount: 10, gameDuration: 10 };
const hard = { carrotCount: 20, bugCount: 40, gameDuration: 20 };

difficulty.addEventListener('click', (e) => {
  let mode = null;
  const target = e.target;
  if (target.matches('.game_easy')) {
    mode = { ...easy };
    console.log('easy clicked');
  } else if (target.matches('.game_hard')) {
    mode = { ...hard };
    console.log('hard clicked');
  }
  difficulty.style.display = 'none';
  gameBtn.removeAttribute('disabled');
  const game = new GameBuilder()
    .withGameDuration(mode.gameDuration)
    .withCarrotCount(mode.carrotCount)
    .withBugCount(mode.bugCount)
    .build();

  game.setGameStopListner((reason) => {
    let message;
    switch (reason) {
      case Reason.cancel:
        message = 'REPLAY?';
        sound.playWin();
        break;
      case Reason.win:
        message = '🎉YOU WON🎉';
        sound.playWin();
        break;
      case Reason.lose:
        message = '💩YOU LOST💩';
        sound.playBug();
        break;
      default:
        throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
  });

  const gameFinishBanner = new PopUp();
  gameFinishBanner.setStartClickListner(() => {
    game.start();
  });
});

// const game = new GameBuilder()
//   .withGameDuration(difficulty.gameDuration)
//   .withCarrotCount(difficulty.carrotCount)
//   .withBugCount(difficulty.bugCount)
//   .build();

// game.setGameStopListner((reason) => {
//   let message;
//   switch (reason) {
//     case Reason.cancel:
//       message = 'REPLAY?';
//       sound.playWin();
//       break;
//     case Reason.win:
//       message = '🎉YOU WON🎉';
//       sound.playWin();
//       break;
//     case Reason.lose:
//       message = '💩YOU LOST💩';
//       sound.playBug();
//       break;
//     default:
//       throw new Error('not valid reason');
//   }
//   gameFinishBanner.showWithText(message);
// });
