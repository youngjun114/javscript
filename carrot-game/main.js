const field = document.querySelector('.game_field');
const popUp = document.querySelector('.pop-up');
const gameBtn = document.querySelector('.game_btn');
const gameTimer = document.querySelector('.game_timer');
const gameScore = document.querySelector('.game_score');
const popUpMessage = document.querySelector('.pop-up_message');
const refresh = document.querySelector('.pop-up_refresh');

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const FIELD_WIDTH = 800;
const FIELD_HEIGHT = 232;
const GAME_DURATION_SECOND = 10;

const fieldRect = field.getBoundingClientRect();
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let timer = undefined;
let score = 0;

function initGame() {
  // clear field
  field.innerHTML = '';
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  createItem('carrot', CARROT_COUNT, '/img/carrot.png');
  createItem('bug', BUG_COUNT, '/img/bug.png');
}

function createItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  // width - carrot image width and height
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = FIELD_HEIGHT - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = generateRandomCoordinates(x1, x2);
    const y = generateRandomCoordinates(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopTimer();
  showPopup('Replay?');
  gameBtn.style.visibility = 'hidden';
  started = !started;
  stopSound(bgSound);
  playSound(alertSound);
}

function finishGame(win) {
  started = false;
  gameBtn.style.visibility = 'hidden';
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopTimer();
  showPopup(win ? 'YOU WON' : 'YOU LOST');
  stopSound(bgSound);
}

function startTimer() {
  let remainingTimeSec = GAME_DURATION_SECOND;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  gameBtn.style.visibility = 'visible';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopup(message) {
  popUp.classList.remove('hide');
  popUpMessage.innerText = message;
}

function hidePopup() {
  popUp.classList.add('hide');
}

function generateRandomCoordinates(min, max) {
  return Math.random() * (max - min) + min;
}

function onFieldClick(event) {
  const target = event.target;
  if (!started) {
    return;
  }
  if (target.matches('.carrot')) {
    playSound(carrotSound);
    target.remove();
    score++;
    updateScore();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.bug')) {
    event.preventDefault();
    finishGame(false);
  }
}

function updateScore() {
  gameScore.innerText = CARROT_COUNT - score;
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

refresh.addEventListener('click', () => {
  startGame();
  hidePopup();
});

field.addEventListener('click', onFieldClick);
