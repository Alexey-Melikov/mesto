import { Card } from "../components/card.js";
import { FormValidator } from "../components/formValidator.js";
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
// Добавляем карточку
const addCard = (object) => {
  object.name = titleInput.value;
  object.link = urlInput.value;
  object.alternative = `Изображение ${titleInput.value}`;
  return object;
};

// открыть попап с картинкой
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

//ОБРАБОТЧИКИ

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

enableValidation(validationConfig);

defaultCardList.renderItems();
