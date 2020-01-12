import Component from '../../lib/component';

import './button.scss';

class Button extends Component {
  constructor(classes, label, onClick) {
    super();

    this.classes = classes;
    this.label = label;
    this.onClick = onClick;
  }

  render(target) {
    this.beforeRender(target);

    const html = /* html */`
      <button class="button ${this.classes}">${this.label}</button>
    `;

    this.appendHtml(html);

    this.el.addEventListener('click', this.onClick);
  }
}

export default Button;