class UserInfo {
  constructor(nameInput, descriptionInput, avatarInput) {
    this._name = nameInput;
    this._description = descriptionInput;
    this._avatarInput = avatarInput;
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._name.textContent;
    this._userInfo.about = this._description.textContent;
    return this._userInfo;
  }

  setUserInfo(data) {
    if (data.name) {
      this._name.textContent = data.name;
    }
    if (data.about) {
      this._description.textContent = data.about;
    }
    if (data.avatar) {
      this._avatarInput.src = data.avatar;
    }
  }

  setUserAvatar(data) {
    if (data.avatar) {
      this._avatarInput.src = data.avatar;
    }
  }
}
export { UserInfo };
