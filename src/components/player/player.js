import Component from '../../lib/component';
import Button from '../button';

import './player.scss';

class Player extends Component {
  constructor(id, label, rules, onActionClick) {
    super();

    this.id = id;
    this.label = label;
    this.rules = rules;
    this.onActionClick = onActionClick;
  }

  render(target) {
    this.beforeRender(target);

    const html = /* html */`
      <div id="player-${this.id}" class="player">
        <div class="player-label">${this.label}</div>
        <div class="player-actions"></div>
      </div>
    `;

    this.appendHtml(html);

    const actionsContainer = this.el;

    this.rules.forEach(rule => {

      const actionButton = new Button(
        `${rule.name.toLowerCase()}-btn`,
        rule.name,
        () => { this.onActionClick(rule) }
      );

      actionButton.render(actionsContainer);
    });
  }
}

export default Player;