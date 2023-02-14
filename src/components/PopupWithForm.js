import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }

  close() {
    super.close();
    this._popupForm.reset();
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
