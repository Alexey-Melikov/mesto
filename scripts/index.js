let profileButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closButton = popup.querySelector(".popup__close-button");
let formEl = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_name");
let profileName = document.querySelector(".profile__name");
let descriptionInput = document.querySelector(".popup__input_description");
let description = document.querySelector(".profile__description");

function popupOpened() {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  descriptionInput.value = description.textContent;
}

function popupClose() {
  popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  popupClose();
}

profileButton.addEventListener("click", popupOpened);

closButton.addEventListener("click", popupClose);

formEl.addEventListener("submit", handleFormSubmit);
