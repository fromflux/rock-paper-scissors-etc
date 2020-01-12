class Component {
  constructor() {
    this.target = null;
    this.el = null;
  }

  beforeRender(target) {
    if (!(target instanceof Node)) {
      throw new Error('Render target must be a DOM node');
    }

    this.target = target;

    if (this.el) {
      this.target.removeChild(this.el);
    }
  }

  render() {
    throw new Error('Base component is not renderable');
  }

  appendHtml(html) {
    const root = document.createElement('div');

    root.insertAdjacentHTML('beforeend', html.trim());

    this.el = root.firstChild;

    this.target.appendChild(this.el);
  }
}

export default Component;