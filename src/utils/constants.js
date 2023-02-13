import altaiMountains from "../images/Altai-mountains.jpg";
import kamchatkaRussia from "../images/Kamchatka-Russia.jpg";
import kungurCave from "../images/Kungur-cave.jpg";
import lakeElton from "../images/lake-elton.jpg";
import marbleCanyon from "../images/Marble-Canyon-Ruskeala.jpg";
import valleyGeysers from "../images/Valley-of-Geysers.jpg";


const initialCards = [
  {
    name: "Горы алтая",
    link: altaiMountains,
    alternative: "Изображение Горы алтая",
  },
  {
    name: "Камчатка",
    link: kamchatkaRussia,
    alternative: "Изображение Камчатка",
  },
  {
    name: "Кунгурская пещера",
    link: kungurCave,
    alternative: "Изображение Кунгурская пещера",
  },
  {
    name: "Озеро эльтон",
    link: lakeElton,
    alternative: "Изображение Озеро эльтон",
  },
  {
    name: "Мраморный каньон Рускеала",
    link: marbleCanyon,
    alternative: "Изображение Мраморный каньон Рускеала",
  },
  {
    name: "Долина гейзеров",
    link: valleyGeysers,
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

/* СЕКЦИЯ ТЕМПЛЕЙТ (КАРТОЧКИ) */
const places = document.querySelector(".places"); // блок в html для карточки

/* ПОПАП РЕДАКТИРОВАНИЕ ПРОФИЛЯ */
const profileButton = document.querySelector(".profile__edit-button"); // кнопка редактирование профился
const popupProfile = document.querySelector("#popup__profile-setting"); // секция попап
const closeButtonPopupProfile = popupProfile.querySelector(
  "#profile-setting_close-button"
); // кнопка закрытия попап
//const formElProfile = document.querySelector("#profile-setting__form"); //форма инпутов
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
//const formElCards = document.querySelector("#cards-setting__form"); //форма инпутов
const titleInput = document.querySelector(".popup__input_title"); // инпут с названием
const urlInput = document.querySelector(".popup__input_url"); // инпут с ссылкой
const popupCardsSaveButton = document.querySelector(".popup__cards-button"); // Кнопка сохраниения Попапа с карточками
/* ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ */

/* ПОПАП ПРОСМОТРА КАРТОЧКИ */
const popupImage = document.querySelector(".popup-image"); // попап с картинкой

const closeButtons = Array.from(
  document.querySelectorAll(".popup__close-button")
);

export {
  initialCards,
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
  popupCardsSaveButton,
  closeButtonCards,
  closeButtons,
};
