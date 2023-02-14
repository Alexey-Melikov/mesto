import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { closePopup } from "../utils/utils.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  initialCards,
  validationConfig,
  places,
  profileButton,
  nameInput,
  profileName,
  descriptionInput,
  description,
  cardsAddButton,
  titleInput,
  urlInput,
  closeButtons,
} from "../utils/constants.js";
import "./index.css";

// Формы валидации
const formValidators = {};

// создаём карточку
function createCard(object) {
  const card = new Card(object, "#template-place", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// открыть попап с картинкой

function handleCardClick(name, link) {
  popupWithImage.setEventListeners();
  popupWithImage.open({ name, link });
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
// Класс popupWithImage  =>
const popupWithImage = new PopupWithImage(".popup-image");

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

// Класс попап карточки =>
const popupCard = new PopupWithForm("#popup__cards-setting", (object) => {
  defaultCardList.addItem(createCard(object));
});

// Класс попап профиля, юзера =>
const userInfo = new UserInfo(profileName, description);

const popupProfileSetting = new PopupWithForm(
  "#popup__profile-setting",
  (object) => {
    userInfo.setUserInfo(object);
  }
);

profileButton.addEventListener("click", function () {
  // открытие попапа по нажатию на кнопку профиля
  popupProfileSetting.open();
  popupProfileSetting.setInputValues(userInfo.getUserInfo());
  formValidators["profile-setup-form"].resetValidation();
});

cardsAddButton.addEventListener("click", function () {
  //открытие попапа по нажатию на кнопку добавление карточки
  popupCard.open();
  formValidators["cards-setting-form"].resetValidation();
});

//ОБРАБОТЧИКИ

enableValidation(validationConfig);
popupProfileSetting.setEventListeners();
defaultCardList.renderItems();
popupCard.setEventListeners();
