'use strict';

import * as sound from './sound.js';

const CARROT_SIZE = 80;
const FIELD_WIDTH = 800;
const FIELD_HEIGHT = 232;

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game_field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }

  setClickListner(onItemClick) {
    this.onItemClick = onItemClick;
  }

  init() {
    this.field.innerHTML = '';
    this._addItem('carrot', this.carrotCount, '/img/carrot.png');
    this._addItem('bug', this.bugCount, '/img/bug.png');
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    // width - carrot image width and height
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = generateRandomCoordinates(x1, x2);
      const y = generateRandomCoordinates(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches('.carrot')) {
      sound.playCarrot();
      target.remove();
      this.onItemClick && this.onItemClick('carrot');
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug');
    }
  };
}

function generateRandomCoordinates(min, max) {
  return Math.random() * (max - min) + min;
}
