class Section {
  constructor({ items, renderer }, container) {
    this._initialArray = items;
    this._container = container;
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
