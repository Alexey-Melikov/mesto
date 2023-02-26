import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._loadingButton = this._popup.querySelector(".popup__button");
    this._initialButtonTextContent = this._loadingButton.textContent;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  loadingProc(value) {
    if (value) {
      this._loadingButton.textContent = "Сохранение...";
    } else {
      this._loadingButton.textContent = this._initialButtonTextContent;
    }
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
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
