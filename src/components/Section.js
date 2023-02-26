class Section {
  constructor(renderer, container) {
    this._container = container;
    this._renderer = renderer;
  }

  renderItems(object) {
    object.reverse().forEach((element) => {
      this._renderer(element, this._container);
    });
  }

  renderItem(element) {
    this._renderer(element, this._container);
  }
}

export { Section };
