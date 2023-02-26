const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

/* СЕКЦИЯ ТЕМПЛЕЙТ (КАРТОЧКИ) */
const places = document.querySelector(".places"); // блок в html для карточки
const templateSelectors = {
  owner: "#template-place-owner",
  anoser: "#template-place",
};

/* ПОПАП РЕДАКТИРОВАНИЕ ПРОФИЛЯ */
const profileButton = document.querySelector(".profile__edit-button"); // кнопка редактирование профился
const popupProfile = document.querySelector("#popup__profile-setting"); // секция попап
const closeButtonPopupProfile = popupProfile.querySelector(
  "#profile-setting_close-button"
);
const avatarButton = document.querySelector(".profile__avatar-button");
// кнопка закрытия попап
//const formElProfile = document.querySelector("#profile-setting__form"); //форма инпутов
const nameInput = document.querySelector(".popup__input_name"); // инпут с именем
const profileName = document.querySelector(".profile__name"); // имя профиля
const descriptionInput = document.querySelector(".popup__input_description"); // инпут с описанием
const description = document.querySelector(".profile__description"); // описание профился
const avatarImage = document.querySelector(".profile__image");
/* РЕДАКТИРОВАНИЕ ПРОФИЛЯ */

/* ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ */
const cardsAddButton = document.querySelector(".profile__add-button"); // кнопка редактирование карточек
const popupCards = document.querySelector("#popup__cards-setting"); // секция попап с карточками
const closeButtonCards = popupCards.querySelector(
  "#cards-setting_close-button"
); // кнопка закрытия попап
//const formElCards = document.querySelector("#cards-setting__form"); //форма инпутов
const titleInput = document.querySelector(".popup__input_title"); // инпут с названием
const urlInput = document.querySelector(".popup__input_url"); // инпут с ссылкой
/* ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ */

const apiConfig = {
  url: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: "50c7d53e-b526-44ca-b3ac-53bfa1ff2f46",
};

/* ПОПАП ПРОСМОТРА КАРТОЧКИ */
const popupImage = document.querySelector(".popup-image"); // попап с картинкой

export {
  templateSelectors,
  validationConfig,
  places,
  profileButton,
  popupProfile,
  nameInput,
  profileName,
  descriptionInput,
  description,
  cardsAddButton,
  popupCards,
  titleInput,
  urlInput,
  popupImage,
  closeButtonPopupProfile,
  closeButtonCards,
  apiConfig,
  avatarImage,
  avatarButton,
};
