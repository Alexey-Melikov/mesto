const initialCards = [
  {
    name: "Горы алтая",
    link: "./images/Altai-mountains.jpg",
    alternative: "Изображение Горы алтая",
  },
  {
    name: "Камчатка",
    link: "./images/Kamchatka-Russia.jpg",
    alternative: "Изображение Камчатка",
  },
  {
    name: "Кунгурская пещера",
    link: "./images/Kungur-cave.jpg",
    alternative: "Изображение Кунгурская пещера",
  },
  {
    name: "Озеро эльтон",
    link: "./images/lake-elton.jpg",
    alternative: "Изображение Озеро эльтон",
  },
  {
    name: "Мраморный каньон Рускеала",
    link: "./images/Marble-Canyon-Ruskeala.jpg",
    alternative: "Изображение Мраморный каньон Рускеала",
  },
  {
    name: "Долина гейзеров",
    link: "./images/Valley-of-Geysers.jpg",
    alternative: "Изображение Долина гейзеров",
  },
];
/* ПОПАП РЕДАКТИРОВАНИЕ ПРОФИЛЯ */
const profileButton = document.querySelector(".profile__edit-button"); // кнопка редактирование профился
const popupProfile = document.querySelector("#popup__profile-setting"); // секция попап
const closeButtonPopupProfile = popupProfile.querySelector("#profile-setting_close-button"); // кнопка закрытия попап
const formElProfile = document.querySelector("#profile-setting__form"); //форма инпутов
const nameInput = document.querySelector(".popup__input_name"); // инпут с именем
const profileName = document.querySelector(".profile__name"); // имя профился
const descriptionInput = document.querySelector(".popup__input_description"); // инпут с описанием
const description = document.querySelector(".profile__description"); // описание профился
/* РЕДАКТИРОВАНИЕ ПРОФИЛЯ */

/* СЕКЦИЯ ТЕМПЛЕЙТ (КАРТОЧКИ) */
const places = document.querySelector(".places");// блок для карточки
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

const openPopup = (item) => {
  item.classList.add("popup_opened"); // открыть попап
};

const popupClose = (item) => {
  item.classList.remove("popup_opened"); // Закрыть попап
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  popupClose(popupProfile);
}

const createPlace = (cardObgect) => {
  const cards = template.content
    .querySelector(".places__place")
    .cloneNode(true);
  cards.querySelector(".places__image").src = cardObgect.link;
  cards.querySelector(".places__depiction").textContent = cardObgect.name;
  cards.querySelector(".places__image").alt = cardObgect.alternative;
  cards //Ставим лайк
    .querySelector(".places__heart")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("places__heart_active");
    });
  cards //Удаляем карточку
    .querySelector(".places__delete-icon")
    .addEventListener("click", function (event) {
      event.target.closest(".places__place").remove();
    });
  cards // Просмотр картинки
    .querySelector(".places__image")
    .addEventListener("click", () => {
      seePicture(cardObgect);
    });
  return cards;
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
    alternative: "Изображение " + titleInput.value,
  });
  popupClose(popupCards);
  titleInput.value = titleInput.ariaPlaceholder;
  urlInput.value = urlInput.ariaPlaceholder;
};

const seePicture = (cardObgect) => {
  captionPopupImage.textContent = cardObgect.name;
  imgPopupImage.src = cardObgect.link;
  imgPopupImage.alt = "Изображение " + captionPopupImage.textContent;
  openPopup(popupImage);
};

//ОБРАБОТЧИКИ

profileButton.addEventListener("click", function () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  descriptionInput.value = description.textContent;
});

closeButtonPopupProfile.addEventListener("click", function () {
  popupClose(popupProfile);
});

formElProfile.addEventListener("submit", handleProfileFormSubmit);


cardsAddButton.addEventListener("click", function () {
  openPopup(popupCards);
});

closeButtonCards.addEventListener("click", function () {
  popupClose(popupCards);
});


formElCards.addEventListener("submit", addCard);

popupImageCloseButton.addEventListener("click", function () {
  popupClose(popupImage);
});

