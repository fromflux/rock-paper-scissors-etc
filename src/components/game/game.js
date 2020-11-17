import Component from '../../lib/component';

import { resolveRound, getRandomAction } from '../../lib/engine';
import State, { GAME_SCREENS, PLAYER_TYPES } from '../../state'

import PlayerScore from '../player-score';
import Button from '../button';
import Player from '../player';

import './game.scss';

class Game extends Component {
  constructor(rules) {
    super();

    this.state = new State(rules);

    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleActionClick = this.handleActionClick.bind(this);
    this.handleExitClick = this.handleExitClick.bind(this);

    window.game = this;
  }

  handleNewGameClick(isSimulation) {
    this.state.set({
      rounds: 1,
      players: [
        {
          type: !isSimulation ? PLAYER_TYPES.HUMAN : PLAYER_TYPES.COMPUTER,
          score: 0,
          lastAction: null,
        }, {
          type: PLAYER_TYPES.COMPUTER,
          score: 0,
          lastAction: null,
        }
      ],
      activeScreen: GAME_SCREENS.PLAY,
      roundResult: null,
    });

    this.render(this.target);
  }

  handleResetClick() {
    const state = this.state.get();

    this.state.set({
      rounds: 1,
      players: state.players.map(player => (
        {
          ...player,
          score: 0,
        }
      )),
      roundResult: null,
    });

    this.render(this.target)
  }

  handleExitClick() {
    this.state.set({
      activeScreen: GAME_SCREENS.MENU,
    });

    this.render(this.target)
  }

  handleActionClick(action) {
    const state = this.state.get();

    const actions = [action, getRandomAction(state.rules)];

    const [winnerIndex, roundResult] = resolveRound(actions);

    this.state.set({
      rounds: state.rounds + 1,
      players: state.players.map((player, index) => (
        {
          ...player,
          score: index === winnerIndex ? player.score + 1 : player.score,
          lastAction: actions[index],
        }
      )),
      roundResult,
    });

    this.render(this.target)
  }

  render(target) {
    this.beforeRender(target);

    const state = this.state.get();

    const isMenuScreen = state.activeScreen === GAME_SCREENS.MENU;

    const gameScreenHtml = /* html */`
      <main>
        <div id="round-count">Round ${state.rounds}</div>
        <div id="score-container"></div>
        <div id="round-result">${state.roundResult || 'Select action'}</div>
        <div id="players-container"></div>
        <div id="game-menu"></div>
      </main>
    `
    const menuScreenHtml = /* html */`
      <main>
        <div id="app-menu"></div>
      </main>
    `

    const html = /* html */`
      <div class="app">
        <header>
          <span class="glitch" data-text="${state.rules.map(rule => rule.name).join(', ')}">${state.rules.map(rule => rule.name).join(', ')}</span>
        </header>
        ${isMenuScreen ? menuScreenHtml : gameScreenHtml}
        <footer>Jan 2020</footer>
      </div>
    `;

    this.appendHtml(html);

    if (isMenuScreen) {

      const humanVsComputerBtn = new Button('human-btn', 'Human vs Computer', () => this.handleNewGameClick());
      humanVsComputerBtn.render(document.getElementById('app-menu'));
      const computerVsComputerBtn = new Button('cumputer-btn', 'Computer vs Computer', () => this.handleNewGameClick(true));
      computerVsComputerBtn.render(document.getElementById('app-menu'));

    } else {

      state.players.forEach((player, index) => {

        const playerScore = new PlayerScore(player);
        playerScore.render(document.getElementById('score-container'));

        if (player.type === PLAYER_TYPES.HUMAN) {
          const playerComponent = new Player(index, `Player ${index + 1}`, state.rules, this.handleActionClick);
          playerComponent.render(document.getElementById('players-container'));
        }

      });

      if (state.players.every(player => player.type === PLAYER_TYPES.COMPUTER)) {
        const resetBtn = new Button('simulate-btn', 'Simulate', () => this.handleActionClick(getRandomAction(state.rules)));
        resetBtn.render(document.getElementById('game-menu'));
      }

      const resetBtn = new Button('reset-btn', 'Restart', this.handleResetClick);
      resetBtn.render(document.getElementById('game-menu'));

      const exitBtn = new Button('exit-btn', 'Exit', this.handleExitClick);
      exitBtn.render(document.getElementById('game-menu'));

    }
  }
}

export default Game;