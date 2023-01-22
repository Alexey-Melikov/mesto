import { Card, places } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { validationConfig, openPopup, closePopup } from "./constants.js";

const allPopups = Array.from(document.querySelectorAll(".popup")); //Все попапы
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

//ФУНКЦИИ

function handleProfileFormSubmit(evt) {
  //Значение инпутов = значение профиля
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  closePopup(popupProfile);
}

const addCard = (event) => {
  event.preventDefault();
  const object = {};
  object.name = titleInput.value;
  object.link = urlInput.value;
  object.alternative = `Изображение ${titleInput.value}`; // Добавляем карточку через попап
  const card = new Card(object, "#template-place");
  const cardElement = card.generateCard();
  places.prepend(cardElement);
  closePopup(popupCards);
  formElCards.reset();
};

//ОБРАБОТЧИКИ

formElCards.addEventListener("submit", addCard);

profileButton.addEventListener("click", function () {
  // открытие попапа по нажатию на кнопку профиля
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  descriptionInput.value = description.textContent;
});

closeButtonPopupProfile.addEventListener("click", function () {
  // Закрытие попапа по нажатию на кнопку Попапа-профиля
  closePopup(popupProfile);
});

formElProfile.addEventListener("submit", handleProfileFormSubmit); //Значение инпутов = значение профиля

allPopups.forEach((popupElement) => {
  popupElement.addEventListener("mousedown", function (event) {
    // Открытый попап закрываеться при нажатии на оверлей
    if (event.target === event.currentTarget) {
      closePopup(popupElement);
    }
  });
});

cardsAddButton.addEventListener("click", function () {
  //открытие попапа по нажатию на кнопку добавление карточки
  openPopup(popupCards);
});
closeButtonCards.addEventListener("click", function () {
  //Закрытие попапа по нажатию на кнопку закрытия попапа-добавление карточки
  closePopup(popupCards);
});

formElCards.addEventListener("submit", addCard);

//Валидация профиля
const profileValidation = () => {
  const profileForm = new FormValidator(validationConfig, formElProfile);
  profileForm.enableValidation();
};
profileValidation();

//Валидация карточек
const cardsValidation = () => {
  const cardsForm = new FormValidator(validationConfig, formElCards);
  cardsForm.enableValidation();
  cardsForm.disableSubmitButton();
};
cardsValidation();
