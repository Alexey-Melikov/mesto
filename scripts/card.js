class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._alternative = data.alternative;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".places__place")
      .cloneNode(true);

    return cardElement;
  }

  _toggleLike(evt) {
    evt.target.classList.toggle("places__heart_active");
  }

  _deleteCard(element) {
    element.remove();
  }

  _setEventListeners() {
    this._element // Ставим лайк
      .querySelector(".places__heart")
      .addEventListener("click", this._toggleLike);

    this._element // Удаляем карточку
      .querySelector(".places__delete-icon")
      .addEventListener("click", () => {
        this._deleteCard(this._element);
      });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".places__image");
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alternative;
    this._element.querySelector(".places__depiction").textContent = this._name;

    return this._element;
  }
}

export { Card };


/*
  _handleImageClick() {
    this._element
      .querySelector(".places__image")
      .addEventListener("click", () => {
        this._handleOpenPicture();
      });
  }
*/