class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector) //Получаем инпуты
    );
    this._buttonElement = this._form.querySelector(
      this._config.submitButtonSelector
    );
  }

  _hideInputError(inputElement) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    this._errorElement.classList.remove(this._config.errorClass);
    this._errorElement.textContent = "";
  }

  _showInputError(inputElement) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._config.errorClass);
  }

  _checkInputValidity(inputElement) {
    inputElement.validity.valid
      ? this._hideInputError(inputElement)
      : this._showInputError(inputElement);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _disableSubmitButton() {
    this._buttonElement.classList.add(this._config.inactiveButtonClass); // Тип кнопки(сохрания попапа) выключенна
    this._buttonElement.disabled = true;
  }

  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _toggleButtonState() {
    this._hasInvalidInput()
      ? this._disableSubmitButton()
      : this._enableSubmitButton();
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export { FormValidator };
