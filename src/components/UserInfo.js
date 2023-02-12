class UserInfo {
  constructor(nameInput, descriptionInput) {
    this._name = nameInput;
    this._description = descriptionInput;
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._name.textContent;
    this._userInfo.description = this.description.textContent;
    return this._userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.username;
    this._description.textContent = data.descriptionImput;
  }
}
export { UserInfo };
