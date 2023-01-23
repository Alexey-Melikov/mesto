const openPopup = (popup) => {
  popup.classList.add("popup_opened"); // открыть попап
  document.addEventListener("keydown", closeByEscape);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened"); // Закрыть попап
  document.removeEventListener("keydown", closeByEscape);
};

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_opened"); // функция закрытия попапа по ESC
    closePopup(popupOpen);
  }
}

export { openPopup, closePopup, closeByEscape };
