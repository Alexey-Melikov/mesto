let profileButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closButton = document.querySelector(".popup__close-button");
let formEl = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input-name");
let profileName = document.querySelector(".profile__name");
let descriptionInput = document.querySelector(".popup__input-description");
let description = document.querySelector(".profile__description");

function popup_opened() {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  descriptionInput.value = description.textContent;
}

function popup__close() {
  popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  popup.classList.remove("popup_opened");
}

profileButton.addEventListener("click", popup_opened);

closButton.addEventListener("click", popup__close);

formEl.addEventListener("submit", handleFormSubmit);

