import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { validationConfig, initialCards } from "./constants.js";
import { openPopup, closePopup } from "./utils.js";

const popups = Array.from(document.querySelectorAll(".popup")); //Все попапы
const closeButtons = Array.from(
  document.querySelectorAll(".popup__close-button")
);
const formValidators = {}; // Формы валидации

/* СЕКЦИЯ ТЕМПЛЕЙТ (КАРТОЧКИ) */
const places = document.querySelector(".places"); // блок в html для карточки
/* СЕКЦИЯ ТЕМПЛЕЙТ (КАРТОЧКИ) */

/* ПОПАП РЕДАКТИРОВАНИЕ ПРОФИЛЯ */
const profileButton = document.querySelector(".profile__edit-button"); // кнопка редактирование профился
const popupProfile = document.querySelector("#popup__profile-setting"); // секция попап
const closeButtonPopupProfile = popupProfile.querySelector(
  "#profile-setting_close-button"
); // кнопка закрытия попап
const formElProfile = document.querySelector("#profile-setting__form"); //форма инпутов
const nameInput = document.querySelector(".popup__input_name"); // инпут с именем
const profileName = document.querySelector(".profile__name"); // имя профился
const descriptionInput = document.querySelector(".popup__input_description"); // инпут с описанием
const description = document.querySelector(".profile__description"); // описание профился
/* РЕДАКТИРОВАНИЕ ПРОФИЛЯ */

/* ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ */
const cardsAddButton = document.querySelector(".profile__add-button"); // кнопка редактирование карточек
const popupCards = document.querySelector("#popup__cards-setting"); // секция попап с карточками
const closeButtonCards = popupCards.querySelector(
  "#cards-setting_close-button"
); // кнопка закрытия попап
const formElCards = document.querySelector("#cards-setting__form"); //форма инпутов
const titleInput = document.querySelector(".popup__input_title"); // инпут с названием
const urlInput = document.querySelector(".popup__input_url"); // инпут с ссылкой
//const popupCardsSaveButton = document.querySelector(".popup__cards-button"); // Кнопка сохраниения Попапа с карточками
/* ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ */

/* ПОПАП ПРОСМОТРА КАРТОЧКИ */
const popupImage = document.querySelector(".popup-image"); // попап с картинкой

// кнопка закрытия попапа с картинкой
const imgPopupImage = popupImage.querySelector(".popup-image__image"); //картинка попапа
const captionPopupImage = popupImage.querySelector(".popup-image__caption"); // Описание картинки
/* ПОПАП ПРОСМОТРА КАРТОЧКИ */

//ФУНКЦИИ

function handleProfileFormSubmit(evt) {
  //Значение инпутов = значение профиля
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  closePopup(popupProfile);
}

function createCard(object) {
  const card = new Card(object, "#template-place", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardClick(name, link) {
  captionPopupImage.textContent = name;
  imgPopupImage.src = link;
  imgPopupImage.alt = `Изображение ${captionPopupImage.textContent}`;
  openPopup(popupImage);
}

const addCard = (event) => {
  event.preventDefault();
  const object = {};
  object.name = titleInput.value;
  object.link = urlInput.value;
  object.alternative = `Изображение ${titleInput.value}`; // Добавляем карточку через попап
  places.prepend(createCard(object));
  closePopup(popupCards);
  formElCards.reset();
};

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

//ОБРАБОТЧИКИ

initialCards.forEach((object) => {
  places.prepend(createCard(object));
});

formElCards.addEventListener("submit", addCard);

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

formElProfile.addEventListener("submit", handleProfileFormSubmit); //Значение инпутов = значение профиля

cardsAddButton.addEventListener("click", function () {
  //открытие попапа по нажатию на кнопку добавление карточки
  openPopup(popupCards);
  formValidators["cards-setting-form"].resetValidation();
});

profileButton.addEventListener("click", function () {
  // открытие попапа по нажатию на кнопку профиля
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  descriptionInput.value = description.textContent;
  formValidators["profile-setup-form"].resetValidation();
});

formElCards.addEventListener("submit", addCard);

enableValidation(validationConfig);

/* 


*/
