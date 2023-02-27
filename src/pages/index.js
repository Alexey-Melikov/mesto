import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  templateSelectors,
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
  apiConfig,
  avatarImage,
  avatarButton,
} from "../utils/constants.js";
import "./index.css";

// Класс Api
const api = new Api(apiConfig);

// Формы валидации
const formValidators = {};

// пользователь
const client = new UserInfo(profileName, description, avatarImage);

// открыть попап с картинкой
function handleCardClick(name, link) {
  popupWithImage.open({ name, link });
}

//колбэк открытия попапа удаления карточки
function handleCallbackDeleteCardOpenPopup(cardId, card) {
  popupConfirm.open(cardId, card);
}
//колбэк удаления карточки
function handleCallbackDeleteCard(cardId, card) {
  popupConfirm.loadingProc(true);
  api
    .handleDeleteCard(cardId)
    .then(() => {
      card.remove();
      popupConfirm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupConfirm.loadingProc(false);
    });
}

//функция для Section
function renderer(element, container) {
  container.prepend(element);
}

// Колбэк создание карточки
function handleCallbackCard(card) {
  popupCard.loadingProc(true);
  api
    .handleAddCard(card)
    .then((data) => {
      popupCard.close();
      return section.renderItem(createCard(data, client.id));
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupCard.loadingProc(false);
    });
}
// Колбэк лайка карточки
function handleCardLike(counter, card, cardId) {
  const heartButton = card.querySelector(".places__heart");
  if (!heartButton.classList.contains("places__heart_active")) {
    api
      .handleLikeCard(cardId)
      .then((res) => {
        counter.textContent = `${res.likes.length}`;
        heartButton.classList.add("places__heart_active");
      })
      .catch((err) => console.log(err));
  } else {
    api
      .handleDisLikeCard(cardId)
      .then((res) => {
        counter.textContent = `${res.likes.length}`;
        heartButton.classList.remove("places__heart_active");
      })
      .catch((err) => console.log(err));
  }
}

// создаём карточку
function createCard(cardData, clientId) {
  const card = new Card(
    cardData,
    templateSelectors,
    handleCardClick,
    clientId,
    handleCallbackDeleteCardOpenPopup,
    handleCardLike
  );
  return card.generateCard();
}

// Класс попап профиля, юзера =>
function handleCallbackProfile(userInfo) {
  popupProfileSetting.loadingProc(true);
  api
    .updateUserInformation(userInfo)
    .then((data) => {
      client.setUserInfo(data);
      popupProfileSetting.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupProfileSetting.loadingProc(false);
    });
}

//данные профиля , карточки
Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then((res) => {
    const userInfo = res[0];
    const initialCards = res[1];

    client.setUserInfo(userInfo);
    avatarImage.src = userInfo.avatar;
    client.id = userInfo._id;

    const defaultCardList = initialCards.map((data) => {
      return createCard(data, client.id);
    });

    section.renderItems(defaultCardList);
  })
  .catch((err) => console.log(err));
//
function handleCallbackAvatar(values) {
  popupAvatar.loadingProc(true);
  api
    .userAvatarUpdate(values)
    .then((data) => {
      client.setUserAvatar(data);
      popupAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAvatar.loadingProc(false);
    });
}
// класс попап аватар
const popupAvatar = new PopupWithForm("#update-avatar", handleCallbackAvatar);
// класс попап профиля =>
const popupProfileSetting = new PopupWithForm(
  "#popup__profile-setting",
  handleCallbackProfile
);
// Класс попап карточки =>
const popupCard = new PopupWithForm(
  "#popup__cards-setting",
  handleCallbackCard
);
// Класс Section  =>
const section = new Section(renderer, places);
//класс попап согласия на удаления
const popupConfirm = new PopupWithConfirm(
  "#delete-card",
  handleCallbackDeleteCard
);
// Класс popupWithImage  =>
const popupWithImage = new PopupWithImage(".popup-image");

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

avatarButton.addEventListener("click", function () {
  //открытие попапа по нажатию на кнопку Обновление аватара
  popupAvatar.open();
  formValidators["update-avatar-form"].resetValidation();
});

profileButton.addEventListener("click", function () {
  // открытие попапа по нажатию на кнопку профиля
  popupProfileSetting.open();
  popupProfileSetting.setInputValues(client.getUserInfo());
  formValidators["profile-setup-form"].resetValidation();
});

cardsAddButton.addEventListener("click", function () {
  //открытие попапа по нажатию на кнопку добавление карточки
  popupCard.open();
  formValidators["cards-setting-form"].resetValidation();
});

// Включение валидации =>
enableValidation(validationConfig);
// Kласс попап аватар =>
popupAvatar.setEventListeners();
// класс попап профиля =>
popupProfileSetting.setEventListeners();
// Класс попап карточки =>
popupCard.setEventListeners();
//класс попап согласия на удаления =>
popupConfirm.setEventListeners();
// Класс popupWithImage  =>
popupWithImage.setEventListeners();
/*

*/
