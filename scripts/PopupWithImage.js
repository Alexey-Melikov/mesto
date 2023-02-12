import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector, image) {
    super(popupSelector);
    this._image = image;
  }

  open() {
    super.open();
    const imgPopupImage = this._popupSelector.querySelector(
      ".popup-image__image"
    ); //картинка попапа
    const captionPopupImage = this._popupSelector.querySelector(
      ".popup-image__caption"
    ); // Описание картинки
    captionPopupImage.textContent = this._image.name;
    imgPopupImage.src = this._image.link;
    imgPopupImage.alt = `Изображение ${this._image.name}`;
    super.setEventListeners();
  }
}

export { PopupWithImage };
