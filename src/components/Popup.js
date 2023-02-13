class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
  open() {
    this._popupSelector.classList.add("popup_opened"); // открыть попап
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove("popup_opened"); // Закрыть попап
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popupSelector.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("popup__close")) {
        this.close();
      }
    });
  }
}
export { Popup };