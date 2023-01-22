import { initialCards, openPopup, closePopup } from "./constants.js";

/* СЕКЦИЯ ТЕМПЛЕЙТ (КАРТОЧКИ) */
const places = document.querySelector(".places"); // блок в html для карточки
/* СЕКЦИЯ ТЕМПЛЕЙТ (КАРТОЧКИ) */

/* ПОПАП ПРОСМОТРА КАРТОЧКИ */
const popupImage = document.querySelector(".popup-image"); // попап с картинкой
const popupImageCloseButton = popupImage.querySelector(
  "#popup-image__close-button"
); // кнопка закрытия попапа с картинкой
const imgPopupImage = popupImage.querySelector(".popup-image__image"); //картинка попапа
const captionPopupImage = popupImage.querySelector(".popup-image__caption"); // Описание картинки
/* ПОПАП ПРОСМОТРА КАРТОЧКИ */

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alternative = data.alternative;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".places__place")
      .cloneNode(true);

    return cardElement;
  }

  _handleOpenPicture() {
    captionPopupImage.textContent = this._name;
    imgPopupImage.src = this._link;
    imgPopupImage.alt = `Изображение ${captionPopupImage.textContent}`;
    openPopup(popupImage);
  }

  _setEventListeners() {
    this._element // Удаляем карточку
      .querySelector(".places__delete-icon")
      .addEventListener("click", () => {
        this._element.remove();
      });
    this._element // Ставим лайк
      .querySelector(".places__heart")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("places__heart_active");
      });
    this._element // Просмотр картинки
      .querySelector(".places__image")
      .addEventListener("click", () => {
        this._handleOpenPicture();
      });
    popupImageCloseButton.addEventListener("click", function () {
      //Закрытие попапа-картинки по нажатию на кнопку
      closePopup(popupImage);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".places__image").src = this._link;
    this._element.querySelector(".places__image").alt = this._alternative;
    this._element.querySelector(".places__depiction").textContent = this._name;

    return this._element;
  }
}

initialCards.forEach((object) => {
  const card = new Card(object, "#template-place");
  const cardElement = card.generateCard();
  places.prepend(cardElement);
});

export { Card, places };
