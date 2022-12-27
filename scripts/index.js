const allPopups = Array.from(document.querySelectorAll(".popup")); //Все попапы
/* ПОПАП РЕДАКТИРОВАНИЕ ПРОФИЛЯ */
const profileButton = document.querySelector(".profile__edit-button"); // кнопка редактирование профился
const popupProfile = document.querySelector("#popup__profile-setting"); // секция попап
const closeButtonPopupProfile = popupProfile.querySelector(
  "#profile-setting_close-button"
); // кнопка закрытия попап
const formElProfile = document.querySelector("#profile-setting__form"); //форма инпутов
const nameInput = document.querySelector(".popup__input_name"); // инпут с именем
const profileName = document.querySelector(".profile__name"); // имя профился
const descriptionInput = document.querySelector(".popup__input_description"); // инпут с описанием
const description = document.querySelector(".profile__description"); // описание профился
/* РЕДАКТИРОВАНИЕ ПРОФИЛЯ */

/* СЕКЦИЯ ТЕМПЛЕЙТ (КАРТОЧКИ) */
const places = document.querySelector(".places"); // блок для карточки
const template = document.querySelector("#template-place"); // секция с карточками
/* СЕКЦИЯ ТЕМПЛЕЙТ (КАРТОЧКИ) */

/* ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ */
const cardsAddButton = document.querySelector(".profile__add-button"); // кнопка редактирование карточек
const popupCards = document.querySelector("#popup__cards-setting"); // секция попап с карточками
const closeButtonCards = popupCards.querySelector(
  "#cards-setting_close-button"
); // кнопка закрытия попап
const formElCards = document.querySelector("#cards-setting__form"); //форма инпутов
const titleInput = document.querySelector(".popup__input_title"); // инпут с названием
const urlInput = document.querySelector(".popup__input_url"); // инпут с ссылкой
const popupCardsSaveButton = document.querySelector(".popup__cards-button"); // Кнопка сохраниения Попапа с карточками
/* ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ */

/* ПОПАП ПРОСМОТРА КАРТОЧКИ */
const popupImage = document.querySelector(".popup-image"); // попап с картинкой
const popupImageCloseButton = popupImage.querySelector(
  "#popup-image__close-button"
); // кнопка закрытия попапа с картинкой
const imgPopupImage = popupImage.querySelector(".popup-image__image"); //картинка попапа
const captionPopupImage = popupImage.querySelector(".popup-image__caption"); // Описание картинки
/* ПОПАП ПРОСМОТРА КАРТОЧКИ */

//ФУНКЦИИ

const openPopup = (popup) => {
  popup.classList.add("popup_opened"); // открыть попап
  document.addEventListener("keydown", keyClosePopup);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened"); // Закрыть попап
  document.removeEventListener("keydown", keyClosePopup);
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  closePopup(popupProfile);
}

const createPlace = (cardObgect) => {
  const card = template.content.querySelector(".places__place").cloneNode(true);
  const cardImage = card.querySelector(".places__image");
  cardImage.src = cardObgect.link;
  card.querySelector(".places__depiction").textContent = cardObgect.name;
  cardImage.alt = cardObgect.alternative;
  card //Ставим лайк
    .querySelector(".places__heart")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("places__heart_active");
    });
  card //Удаляем карточку
    .querySelector(".places__delete-icon")
    .addEventListener("click", () => {
      card.remove();
    });
  card // Просмотр картинки
    .querySelector(".places__image")
    .addEventListener("click", () => {
      seePicture(cardObgect);
    });
  return card;
};

const renderCard = (cardObgect) => {
  places.prepend(createPlace(cardObgect));
};

initialCards.forEach((cardObgect) => {
  renderCard(cardObgect);
});

const addCard = (event) => {
  event.preventDefault();
  renderCard({
    name: titleInput.value,
    link: urlInput.value,
    alternative: `Изображение ${titleInput.value}`,
  });
  closePopup(popupCards);
  formElCards.reset();
};

const seePicture = (cardObgect) => {
  captionPopupImage.textContent = cardObgect.name;
  imgPopupImage.src = cardObgect.link;
  imgPopupImage.alt = `Изображение ${captionPopupImage.textContent}`;
  openPopup(popupImage);
};

function keyClosePopup(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_opened"); // функци закрытия попапа по ESC
    closePopup(popupOpen);
  }
}

//ОБРАБОТЧИКИ

profileButton.addEventListener("click", function () {
  // открытие попапа по нажатию на кнопку профиля
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  descriptionInput.value = description.textContent;
});

closeButtonPopupProfile.addEventListener("click", function () {
  // Закрытие попапа по нажатию на кнопку Попапа-профиля
  closePopup(popupProfile);
});

formElProfile.addEventListener("submit", handleProfileFormSubmit); //Значение инпутов = значение профиля

cardsAddButton.addEventListener("click", function () {
  //открытие попапа по нажатию на кнопку добавление карточки
  openPopup(popupCards);
  disableSubmitButton(popupCardsSaveButton, validationConfig);
});

closeButtonCards.addEventListener("click", function () {
  //Закрытие попапа по нажатию на кнопку закрытия попапа-добавление карточки
  closePopup(popupCards);
});

formElCards.addEventListener("submit", addCard); // добавление карточки на страницу

popupImageCloseButton.addEventListener("click", function () {
  //Закрытие попапа-картинки по нажатию на кнопку
  closePopup(popupImage);
});

allPopups.forEach((popupElement) => {
  popupElement.addEventListener("mousedown", function (event) {
    // Открытый попап закрываеться при нажатии на оверлей
    if (event.target === event.currentTarget) {
      closePopup(popupElement);
    }
  });
});

enableValidation(validationConfig);
