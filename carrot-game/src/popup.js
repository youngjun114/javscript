'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpMessage = document.querySelector('.pop-up_message');
    this.refresh = document.querySelector('.pop-up_refresh');
    this.refresh.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setStartClickListner(onClick) {
    this.onClick = onClick;
  }


  showWithText(message) {
    this.popUpMessage.innerText = message;
    this.popUp.classList.remove('hide');
  }

  hide() {
    this.popUp.classList.add('hide');
  }
}
