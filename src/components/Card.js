class Card {
  constructor(
    data,
    templateSelectors,
    handleCardClick,
    clientId,
    handleCallbackDeleteCardOpenPopup,
    handleCardLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._alternative = data.alternative;
    this._templateSelectors = templateSelectors;
    this._handleCardClick = handleCardClick;
    this._owner = data.owner._id;
    this._clientId = clientId;
    this._cardId = data._id;
    this._handleCallbackDeleteCardOpenPopup = handleCallbackDeleteCardOpenPopup;
    this._handleCardLike = handleCardLike;
  }
  // Разметка карточки
  _getTemplate(template) {
    const cardElement = document
      .querySelector(template)
      .content.querySelector(".places__place")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    //проверяем обладателя => берем темплейт
    this._element =
      this._clientId === this._owner
        ? this._getTemplate(this._templateSelectors.owner)
        : this._getTemplate(this._templateSelectors.anoser);
    this._deleteIcon = this._element.querySelector(".places__delete-icon");
    this._cardImage = this._element.querySelector(".places__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alternative;
    this._element.querySelector(".places__depiction").textContent = this._name;

    this._likeCalculator = this._element.querySelector(
      ".places__like-calculator"
    );
    this._likeCalculator.textContent = this._likes.length;

    if (this._likes.find((like) => like._id === this._clientId)) {
      this._element
        .querySelector(".places__heart")
        .classList.add("places__heart_active");
    }

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element // Ставим лайк
      .querySelector(".places__heart")
      .addEventListener("click", () => {
        this._handleCardLike(this._likeCalculator, this._element, this._cardId);
      });

    if (this._deleteIcon) { // Удаляем карточку
      this._deleteIcon.addEventListener("click", () => {
        this._handleCallbackDeleteCardOpenPopup(this._cardId, this._element);
      });
    }
    this._cardImage.addEventListener("click", () => { // Просмотр картинки с карточки
      this._handleCardClick(this._name, this._link);
    });
  }
}

export { Card };
