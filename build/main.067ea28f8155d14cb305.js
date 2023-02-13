(() => {
  "use strict";
  var e = {};
  (e.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      var t;
      e.g.importScripts && (t = e.g.location + "");
      var r = e.g.document;
      if (!t && r && (r.currentScript && (t = r.currentScript.src), !t)) {
        var s = r.getElementsByTagName("script");
        s.length && (t = s[s.length - 1].src);
      }
      if (!t)
        throw new Error(
          "Automatic publicPath is not supported in this browser"
        );
      (t = t
        .replace(/#.*$/, "")
        .replace(/\?.*$/, "")
        .replace(/\/[^\/]+$/, "/")),
        (e.p = t);
    })();
  class t {
    constructor(e, t, r) {
      (this._name = e.name),
        (this._link = e.link),
        (this._alternative = e.alternative),
        (this._templateSelector = t),
        (this._handleCardClick = r);
    }
    _getTemplate() {
      return document
        .querySelector(this._templateSelector)
        .content.querySelector(".places__place")
        .cloneNode(!0);
    }
    _toggleLike(e) {
      e.target.classList.toggle("places__heart_active");
    }
    _deleteCard(e) {
      e.remove();
    }
    _setEventListeners() {
      this._element
        .querySelector(".places__heart")
        .addEventListener("click", this._toggleLike),
        this._element
          .querySelector(".places__delete-icon")
          .addEventListener("click", () => {
            this._deleteCard(this._element);
          }),
        this._cardImage.addEventListener("click", () => {
          this._handleCardClick(this._name, this._link);
        });
    }
    generateCard() {
      return (
        (this._element = this._getTemplate()),
        (this._cardImage = this._element.querySelector(".places__image")),
        this._setEventListeners(),
        (this._cardImage.src = this._link),
        (this._cardImage.alt = this._alternative),
        (this._element.querySelector(".places__depiction").textContent =
          this._name),
        this._element
      );
    }
  }
  class r {
    constructor(e, t) {
      (this._config = e),
        (this._form = t),
        (this._inputList = Array.from(
          this._form.querySelectorAll(this._config.inputSelector)
        )),
        (this._buttonElement = this._form.querySelector(
          this._config.submitButtonSelector
        ));
    }
    _hideInputError(e) {
      (this._errorElement = this._form.querySelector(`.${e.id}-error`)),
        e.classList.remove(this._config.inputErrorClass),
        this._errorElement.classList.remove(this._config.errorClass),
        (this._errorElement.textContent = "");
    }
    _showInputError(e) {
      (this._errorElement = this._form.querySelector(`.${e.id}-error`)),
        e.classList.add(this._config.inputErrorClass),
        (this._errorElement.textContent = e.validationMessage),
        this._errorElement.classList.add(this._config.errorClass);
    }
    _checkInputValidity(e) {
      e.validity.valid ? this._hideInputError(e) : this._showInputError(e);
    }
    _hasInvalidInput() {
      return this._inputList.some((e) => !e.validity.valid);
    }
    _disableSubmitButton() {
      this._buttonElement.classList.add(this._config.inactiveButtonClass),
        (this._buttonElement.disabled = !0);
    }
    _enableSubmitButton() {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass),
        (this._buttonElement.disabled = !1);
    }
    _toggleButtonState() {
      this._hasInvalidInput()
        ? this._disableSubmitButton()
        : this._enableSubmitButton();
    }
    _setEventListeners() {
      this._inputList.forEach((e) => {
        e.addEventListener("input", () => {
          this._checkInputValidity(e), this._toggleButtonState();
        });
      });
    }
    resetValidation() {
      this._toggleButtonState(),
        this._inputList.forEach((e) => {
          this._hideInputError(e);
        });
    }
    enableValidation() {
      this._setEventListeners();
    }
  }
  class s {
    constructor(e) {
      this._popupSelector = e;
    }
    open() {
      this._popupSelector.classList.add("popup_opened"),
        document.addEventListener("keydown", this._handleEscClose);
    }
    close() {
      this._popupSelector.classList.remove("popup_opened"),
        document.removeEventListener("keydown", this._handleEscClose);
    }
    _handleEscClose = (e) => {
      "Escape" === e.key && this.close();
    };
    setEventListeners() {
      this._popupSelector.addEventListener("mousedown", (e) => {
        e.target.classList.contains("popup_opened") && this.close(),
          e.target.classList.contains("popup__close") && this.close();
      });
    }
  }
  class n extends s {
    constructor(e, t) {
      super(e), (this._image = t);
    }
    open() {
      super.open();
      const e = this._popupSelector.querySelector(".popup-image__image");
      (this._popupSelector.querySelector(".popup-image__caption").textContent =
        this._image.name),
        (e.src = this._image.link),
        (e.alt = `Изображение ${this._image.name}`),
        super.setEventListeners();
    }
  }
  class i extends s {
    constructor(e, t) {
      super(e),
        (this._handlerFormSubmit = t),
        (this._popupForm = this._popupSelector.querySelector(".popup__form")),
        (this._inputList = this._popupForm.querySelectorAll(".popup__input"));
    }
    open() {
      super.open(),
        this._popupSelector.classList.add("popup_opened"),
        this._popupForm.reset();
    }
    close() {
      super.close(), this._popupForm.reset();
    }
    _getInputValues() {
      return (
        (this._formData = {}),
        this._inputList.forEach((e) => {
          this._formData[e.name] = e.value;
        }),
        this._formData
      );
    }
    setEventListeners() {
      super.setEventListeners(),
        this._popupForm.addEventListener("submit", (e) => {
          e.preventDefault(),
            this._handlerFormSubmit(this._getInputValues()),
            this.close();
        });
    }
  }
  const o = [
      {
        name: "Горы алтая",
        link: e.p + "4491e752b5e39863fc80.jpg",
        alternative: "Изображение Горы алтая",
      },
      {
        name: "Камчатка",
        link: e.p + "6b7ad77dc5f7e1407dd6.jpg",
        alternative: "Изображение Камчатка",
      },
      {
        name: "Кунгурская пещера",
        link: e.p + "ef9c8d0257fe996080b8.jpg",
        alternative: "Изображение Кунгурская пещера",
      },
      {
        name: "Озеро эльтон",
        link: e.p + "61a13b461b8a7d0a6d32.jpg",
        alternative: "Изображение Озеро эльтон",
      },
      {
        name: "Мраморный каньон Рускеала",
        link: e.p + "d987e5abb9f5495b8ce2.jpg",
        alternative: "Изображение Мраморный каньон Рускеала",
      },
      {
        name: "Долина гейзеров",
        link: e.p + "b8cc9bf72a1e3172fcc2.jpg",
        alternative: "Изображение Долина гейзеров",
      },
    ],
    a = document.querySelector(".places"),
    l = document.querySelector(".profile__edit-button"),
    p = document.querySelector("#popup__profile-setting"),
    c =
      (p.querySelector("#profile-setting_close-button"),
      document.querySelector(".popup__input_name")),
    u = document.querySelector(".profile__name"),
    _ = document.querySelector(".popup__input_description"),
    h = document.querySelector(".profile__description"),
    d = document.querySelector(".profile__add-button"),
    m = document.querySelector("#popup__cards-setting"),
    g =
      (m.querySelector("#cards-setting_close-button"),
      document.querySelector(".popup__input_title")),
    f = document.querySelector(".popup__input_url"),
    v =
      (document.querySelector(".popup__cards-button"),
      document.querySelector(".popup-image")),
    S = Array.from(document.querySelectorAll(".popup__close-button")),
    E = {};
  function b(e) {
    return new t(e, "#template-place", y).generateCard();
  }
  function y(e, t) {
    new n(v, { name: e, link: t }).open();
  }
  const L = new (class {
      constructor({ items: e, renderer: t }, r) {
        (this._initialArray = e), (this._container = r), (this._renderer = t);
      }
      renderItems() {
        this._initialArray.forEach((e) => {
          this._renderer(e);
        });
      }
      addItem(e) {
        this._container.prepend(e);
      }
    })(
      {
        items: o,
        renderer: (e) => {
          L.addItem(b(e));
        },
      },
      a
    ),
    q = new (class {
      constructor(e, t) {
        (this._name = e), (this._description = t);
      }
      getUserInfo() {
        return (
          (this._userInfo = {}),
          (this._userInfo.name = this._name.textContent),
          (this._userInfo.description = this.description.textContent),
          this._userInfo
        );
      }
      setUserInfo(e) {
        (this._name.textContent = e.username),
          (this._description.textContent = e.descriptionImput);
      }
    })(u, h),
    C = new i(p, (e) => {
      q.setUserInfo(e);
    });
  C.setEventListeners(),
    l.addEventListener("click", function () {
      C.open(),
        (c.value = u.textContent),
        (_.value = h.textContent),
        E["profile-setup-form"].resetValidation();
    });
  const I = new i(m, (e) => {
    const t = ((e) => (
      (e.name = g.value),
      (e.link = f.value),
      (e.alternative = `Изображение ${g.value}`),
      e
    ))(e);
    L.addItem(b(t));
  });
  var k;
  I.setEventListeners(),
    d.addEventListener("click", function () {
      I.open(), E["cards-setting-form"].resetValidation();
    }),
    S.forEach((e) => {
      const t = e.closest(".popup");
      e.addEventListener("click", () =>
        ((e) => {
          e.classList.remove("popup_opened");
        })(t)
      );
    }),
    (k = {
      formSelector: ".popup__form",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    }),
    Array.from(document.querySelectorAll(k.formSelector)).forEach((e) => {
      const t = new r(k, e),
        s = e.getAttribute("name");
      (E[s] = t), t.enableValidation();
    }),
    L.renderItems();
})();
