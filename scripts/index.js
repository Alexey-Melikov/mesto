import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { validationConfig, initialCards } from "./constants.js";
import { closePopup } from "./utils.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { Popup } from "./Popup.js";

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
const profileName = document.querySelector(".profile__name"); // имя профиля
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

//ФУНКЦИИ

function createCard(object) {
  const card = new Card(object, "#template-place", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement; // создаём карточку
}

const addCard = (object) => {
  object.name = titleInput.value;
  object.link = urlInput.value;
  object.alternative = `Изображение ${titleInput.value}`; // Добавляем карточку через попап
  return object;
};

function handleCardClick(name, link) {
  const popupWithImage = new PopupWithImage(popupImage, { name, link });
  popupWithImage.open();
}

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
// Класс Section  =>
const defaultCardList = new Section(
  {
    //добавляем на страницу дефолт карточки
    items: initialCards,
    renderer: (element) => {
      defaultCardList.addItem(createCard(element));
    },
  },
  places
);

//ОБРАБОТЧИКИ

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// Класс попап профиля =>
const userInfo = new UserInfo(profileName, description);

const popupProfileSetting = new PopupWithForm(popupProfile, (object) => {
  userInfo.setUserInfo(object);
});

popupProfileSetting.setEventListeners();

profileButton.addEventListener("click", function () {
  // открытие попапа по нажатию на кнопку профиля
  popupProfileSetting.open();
  nameInput.value = profileName.textContent;
  descriptionInput.value = description.textContent;
  formValidators["profile-setup-form"].resetValidation();
});

// Класс попап карточки =>

const popupCard = new PopupWithForm(popupCards, (object) => {
  const card = addCard(object);
  defaultCardList.addItem(createCard(card));
});

popupCard.setEventListeners();

cardsAddButton.addEventListener("click", function () {
  //открытие попапа по нажатию на кнопку добавление карточки
  popupCard.open();
  formValidators["cards-setting-form"].resetValidation();
});

enableValidation(validationConfig);

defaultCardList.renderItems();
