const initialCards = [
  {
    name: "Горы алтая",
    link: "./images/Altai-mountains.jpg",
    alternative: "Изображение Горы алтая",
  },
  {
    name: "Камчатка",
    link: "./images/Kamchatka-Russia.jpg",
    alternative: "Изображение Камчатка",
  },
  {
    name: "Кунгурская пещера",
    link: "./images/Kungur-cave.jpg",
    alternative: "Изображение Кунгурская пещера",
  },
  {
    name: "Озеро эльтон",
    link: "./images/lake-elton.jpg",
    alternative: "Изображение Озеро эльтон",
  },
  {
    name: "Мраморный каньон Рускеала",
    link: "./images/Marble-Canyon-Ruskeala.jpg",
    alternative: "Изображение Мраморный каньон Рускеала",
  },
  {
    name: "Долина гейзеров",
    link: "./images/Valley-of-Geysers.jpg",
    alternative: "Изображение Долина гейзеров",
  },
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened"); // открыть попап
  document.addEventListener("keydown", keyClosePopup);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened"); // Закрыть попап
  document.removeEventListener("keydown", keyClosePopup);
};

function keyClosePopup(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_opened"); // функция закрытия попапа по ESC
    closePopup(popupOpen);
  }
}

export { initialCards, validationConfig, openPopup, closePopup, keyClosePopup };
