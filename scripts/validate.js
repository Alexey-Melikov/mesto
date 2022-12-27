function showInputError(formElement, inputElement, config) {
  // Добавить класс с ошибкой
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
}

function hideInputError(formElement, inputElement, config) {
  // Убрать класс с ошибкой
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, config) {
  // Проверка Вадидации инпутов
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function disableSubmitButton(buttonElement, config) {
  buttonElement.classList.add(config.inactiveButtonClass); // Тип кнопки(сохрания попапа) выключенна
  buttonElement.disabled = true;
}

function enableSubmitButton(buttonElement, config) {
  //Тип кнопки(сохрания попапа) включенна
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
}

function toggleButtonState(inputList, buttonElement, config) {
  // Проверка на вадидность => изминения типа кнопки
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, config);
  } else {
    enableSubmitButton(buttonElement, config);
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector) //Получаем инпуты
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector); // Получаем кнопки
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

function enableValidation(config) {
  const formAll = Array.from(document.querySelectorAll(config.formSelector)); //Получаем формы
  formAll.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}
