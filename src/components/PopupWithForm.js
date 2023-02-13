import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._popupForm = this._popupSelector.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }

  open() {
    super.open();
    this._popupSelector.classList.add("popup_opened"); // открыть попап
    this._popupForm.reset();
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  _getInputValues() {
    this._formData = {};
    this._inputList.forEach((input) => {
      this._formData[input.name] = input.value;
    });
    return this._formData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handlerFormSubmit(this._getInputValues());
      this.close();
    });
  }
}

export { PopupWithForm };