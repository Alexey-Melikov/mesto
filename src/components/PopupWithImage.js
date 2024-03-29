import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup-image__image"); //картинка попапа
    this._captionPopupImage = this._popup.querySelector(
      // Описание картинки
      ".popup-image__caption"
    );
  }

  open(image) {
    super.open();
    this._captionPopupImage.textContent = image.name;
    this._popupImage.src = image.link;
    this._popupImage.alt = `Изображение ${image.name}`;
  }
}

export { PopupWithImage };
