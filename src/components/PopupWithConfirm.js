import { Popup } from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._loadingButton = this._popup.querySelector(".popup__button");
    this._initialButtonTextContent = this._loadingButton.textContent;
  }

  loadingProc(value) {
    if (value) {
      this._loadingButton.textContent = "Сохранение...";
    } else {
      this._loadingButton.textContent = this._initialButtonTextContent;
    }
  }

  open(cardId, card) {
    this._card = card;
    this._cardId = cardId;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handlerFormSubmit(this._cardId, this._card);
    });
  }
}
