export default class api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _handleResponseStatus(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Произошла ошибка: ${res.status}`);
  }

  getUserInformation() {
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: {
        authorization: this.headers,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      method: "GET",
      headers: {
        authorization: this.headers,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }

  updateUserInformation(userInfo) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }

  handleAddCard(card) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: {
        authorization: this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }

  handleDeleteCard(card) {
    return fetch(`${this.url}/cards/${card}`, {
      method: "DELETE",
      headers: {
        authorization: this.headers,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }

  handleLikeCard(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: "PUT",
      headers: {
        authorization: this.headers,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }

  handleDisLikeCard(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this.headers,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }

  userAvatarUpdate(userInfo) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: userInfo.avatarImput,
      }),
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }
}
