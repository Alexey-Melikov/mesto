class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._container = containerSelector;
    this._renderer = renderer;
  }

  renderItems() {
    this._initialArray.forEach((element) => {
      this._renderer(element);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export { Section };
