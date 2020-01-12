import Component from '../../lib/component';

import './player-score.scss';

class PlayerScore extends Component {
  constructor(player) {
    super();
    this.player = player;
  }

  render(target) {
    this.beforeRender(target);

    const html = /* html */`
      <div id="score-${this.player.type.toLowerCase()}" class="player-score">
        <div class="player-score-type">${this.player.type}</div>
        <div class="player-score-value">${this.player.score}</div>
      </div>
    `;

    this.appendHtml(html);
  }
}

export default PlayerScore;